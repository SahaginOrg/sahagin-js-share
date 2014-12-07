/**
 * @class
 */
sahagin.TestDocResolver = function() {};

/**
 * @type {string}
 */
sahagin.TestDocResolver.MSG_INVALID_PLACEHOLDER
= 'TestDoc of "{0}" contains invalid keyword "{1}"';

/**
 * @private
 * @returns {RegExp}
 */
sahagin.TestDocResolver.generatePlaceHolderRegExp = function() {
  return new RegExp(/{[^{}]+}/g);
};

/**
 * Returns invalid placeholder keyword in the specified TestFunction if exists.
 * Returns null if invalid keyword is not found.
 * @param {sahagin.TestFunction} func
 * @returns {string}
 */
sahagin.TestDocResolver.searchInvalidPlaceholder = function(func) {
  if (func == null || func == undefined) {
    throw new Error(func);
  }
  if (func.getTestDoc() == null) {
    return null; // no TestDoc
  }

  // replace all placeholders by RegExp
  var matched;
  var testDoc = func.getTestDoc();
  var regexp = sahagin.TestDocResolver.generatePlaceHolderRegExp();
  while ((matched = regexp.exec(testDoc)) != null) {
    var variable = matched[0];
    variable = variable.substring(1, variable.length - 1); // trim head and tail braces
    var varIndex = parseInt(variable, 10);
    if (isNaN(varIndex)) {
      // not index pattern
      if (func.getArgVariables().indexOf(variable) == -1) {
        return variable;
      }
    } else {
      // TODO index check
    }
  }
  return null;
};

/**
 * Returns original source code if TestDoc is not found
 * @private
 * @param {sahagin.Code} code
 * @returns {string}
 */
sahagin.TestDocResolver.funcTestDocSub = function(code) {
  if (code instanceof sahagin.StringCode) {
    return code.getValue();
  } else if (code instanceof sahagin.SubFunctionInvoke) {
    var funcInvoke = code;
    var func = funcInvoke.getSubFunction();
    if (func.getTestDoc() == null) {
      return funcInvoke.getOriginal();
    }

    // replace all placeholders by RegExp
    var matched;
    var buf = '';
    var prevEnd = 0;
    var testDoc = func.getTestDoc();
    var regexp = sahagin.TestDocResolver.generatePlaceHolderRegExp();
    while ((matched = regexp.exec(testDoc)) !== null) {
      var variable = matched[0];
      var matchStart = matched.index;
      var matchEnd = matchStart + variable.length;
      variable = variable.substring(1, variable.length - 1); // trim head and tail braces
      var varIndex = parseInt(variable, 10);
      if (isNaN(varIndex)) {
        // not index pattern
        varIndex = func.getArgVariables().indexOf(variable);
      }
      if (varIndex < 0 || varIndex >= funcInvoke.getArgs().length) {
        throw new Error(sahagin.CommonUtils.strFormat(
            sahagin.TestDocResolver.MSG_INVALID_PLACEHOLDER,
            func.getQualifiedName(), variable));
      }
      buf = buf + testDoc.substring(prevEnd, matchStart)
      + sahagin.TestDocResolver.funcTestDocSub(funcInvoke.getArgs()[varIndex]);
      prevEnd = matchEnd;
    }
    buf = buf + testDoc.substring(prevEnd, testDoc.length);
    return buf;
  }
};

/**
 * @param {sahagin.Code} code
 * @returns {string}
 */
sahagin.TestDocResolver.placeholderResolvedFuncTestDoc = function(code) {
  if (code instanceof sahagin.UnknownCode) {
    return null; // TestDoc for UnknownCode is null
  } else {
    return sahagin.TestDocResolver.funcTestDocSub(code);
  }
};

/**
 * returns null if Page not found
 * @private
 * @param {sahagin.SubMethodInvoke} methodInvoke
 * @returns {string}
 */
sahagin.TestDocResolver.methodInvokePageTestDocNoRecursive = function(methodInvoke) {
  if (!(methodInvoke.getSubMethod().getTestClass() instanceof sahagin.PageClass)) {
    return null;
  }
  var page = methodInvoke.getSubMethod().getTestClass();
  return page.getTestDoc();
};

/**
 * Returns first found page testDoc.
 * returns null if page testDoc not found
 * @private
 * @param {sahagin.SubMethodInvoke} methodInvoke
 * @returns {string}
 */
sahagin.TestDocResolver.methodInvokePageTestDocRecursive = function(methodInvoke) {
  var pageTestDoc = sahagin.TestDocResolver.methodInvokePageTestDocNoRecursive(methodInvoke);
  if (pageTestDoc != null) {
    return pageTestDoc;
  }
  for (var i = 0; i < methodInvoke.getArgs().length; i++) {
    var code = methodInvoke.getArgs()[i];
    if (code && code instanceof sahagin.SubMethodInvoke) {
      var codeLinePageTestDoc
      = sahagin.TestDocResolver.methodInvokePageTestDocRecursive(code);
      if (codeLinePageTestDoc != null) {
        return codeLinePageTestDoc;
      }
    }
  }
  return null;
};

/**
 * Returns first found page testDoc.
 * returns null if page testDoc not found
 * @param {sahagin.Code} code
 * @returns {string}
 */
sahagin.TestDocResolver.pageTestDoc = function(code) {
  if (!(code instanceof sahagin.SubMethodInvoke)) {
    return null;
  }
  var invoke = code;
  return sahagin.TestDocResolver.methodInvokePageTestDocRecursive(invoke);
};