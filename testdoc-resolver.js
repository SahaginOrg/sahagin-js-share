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
 * Returns invalid placeholder keyword in the specified TestMethod if exists.
 * Returns null if invalid keyword is not found.
 * @param {sahagin.TestMethod} method
 * @returns {string}
 */
sahagin.TestDocResolver.searchInvalidPlaceholder = function(method) {
  if (method == null || method == undefined) {
    throw new Error(method);
  }
  if (method.getTestDoc() == null) {
    return null; // no TestDoc
  }

  // replace all placeholders by RegExp
  var matched;
  var testDoc = method.getTestDoc();
  var regexp = sahagin.TestDocResolver.generatePlaceHolderRegExp();
  while ((matched = regexp.exec(testDoc)) != null) {
    var variable = matched[0];
    variable = variable.substring(1, variable.length - 1); // trim head and tail braces
    var varIndex = parseInt(variable, 10);
    if (isNaN(varIndex)) {
      // not index pattern
      if (matched == "this") {
        continue;
      } else if (method.getArgVariables().indexOf(variable) == -1) {
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
 * @param {Array.<string>} placeholderResolvedParentMethodArgTestDocs
 * @returns {string}
 */
sahagin.TestDocResolver.methodTestDocSub = function(
    code, placeholderResolvedParentMethodArgTestDocs) {
  if (code instanceof sahagin.StringCode) {
    return code.getValue();
  } else if (code instanceof sahagin.MethodArgument) {
    var methodArg = code;
    return placeholderResolvedParentMethodArgTestDocs[methodArg.getArgIndex()];
  } else if (code instanceof sahagin.SubMethodInvoke) {
    var methodInvoke = code;
    var method = methodInvoke.getSubMethod();
    if (method.getTestDoc() == null) {
      return methodInvoke.getOriginal();
    }

    // replace all placeholders by RegExp
    var matched;
    var buf = '';
    var prevEnd = 0;
    var testDoc = method.getTestDoc();
    var regexp = sahagin.TestDocResolver.generatePlaceHolderRegExp();
    while ((matched = regexp.exec(testDoc)) !== null) {
      var variable = matched[0];
      var matchStart = matched.index;
      var matchEnd = matchStart + variable.length;
      variable = variable.substring(1, variable.length - 1); // trim head and tail braces
      var isIndexPattern = false;
      var varIndex = parseInt(variable, 10);
      if (!isNaN(varIndex)) {
        isIndexPattern = true;
      }

      var variableCode;
      if (!isIndexPattern && variable == "this") {
        variableCode = methodInvoke.getThisInstance();
        if (variableCode == null) {
          // When called inside the class on which this method is defined,
          // set the class name for {this} keyword
          variableCode = new sahagin.UnknownCode();
          variableCode.setOriginal(methodInvoke.getSubMethod().getTestClass().getSimpleName());
        }
      } else {
        if (!isIndexPattern) {
          varIndex = method.getArgVariables().indexOf(variable);
        }
        if (varIndex < 0 || varIndex >= methodInvoke.getArgs().length) {
          throw new Error(sahagin.CommonUtils.strFormat(
              sahagin.TestDocResolver.MSG_INVALID_PLACEHOLDER,
              method.getQualifiedName(), variable));
        }
        variableCode = methodInvoke.getArgs()[varIndex];
      }
      buf = buf + testDoc.substring(prevEnd, matchStart)
      + sahagin.TestDocResolver.methodTestDocSub(
          variableCode, placeholderResolvedParentMethodArgTestDocs);
      prevEnd = matchEnd;
    }
    buf = buf + testDoc.substring(prevEnd, testDoc.length);
    return buf;
  } else {
    return code.getOriginal();
  }
};

/**
 * @param {sahagin.Code} code
 * @param {Array.<string>} placeholderResolvedParentMethodArgTestDocs
 * @returns {Array.<string>}
 */
sahagin.TestDocResolver.placeholderResolvedMethodArgTestDocs = function(
    code, placeholderResolvedParentMethodArgTestDocs) {
  if (!(code instanceof sahagin.SubMethodInvoke)) {
    return new Array();
  }
  var methodInvoke = code;
  var result = new Array();
  for (var i = 0; i < methodInvoke.getArgs().length; i++) {
    var code = methodInvoke.getArgs()[i];
    var argStr = sahagin.TestDocResolver.methodTestDocSub(
        code, placeholderResolvedParentMethodArgTestDocs);
    result.push(argStr);
  }
  return result;
};

/**
 * @param {sahagin.Code} code
 * @param {Array.<string>} placeholderResolvedParentMethodArgTestDocs
 * @returns {string}
 */
sahagin.TestDocResolver.placeholderResolvedMethodTestDoc = function(
    code, placeholderResolvedParentMethodArgTestDocs) {
  if (code instanceof sahagin.UnknownCode) {
    return null; // TestDoc for UnknownCode is null
  } else {
    return sahagin.TestDocResolver.methodTestDocSub(
        code, placeholderResolvedParentMethodArgTestDocs);
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