/**
 * @class
 */
sahagin.TestDocResolver = function() {};

/**
 * @private
 * @type {string}
 */
sahagin.TestDocResolver.MSG_INVALID_PLACEHOLDER
= 'TestDoc of "{0}" contains invalid keyword "{1}"';

/**
 * @private
 * @type {string}
 */
sahagin.TestDocResolver.MSG_INVALID_PLACEHOLDER_POS
= 'TestDoc of "{0}" contains invalid position keyword {1}';

/**
 * @private
 * @type {string}
 */
sahagin.TestDocResolver.MSG_STATEMENT_NOT_CLOSED
= '{end} keyword not found in TestDoc of "{0}"';

/**
 * exposed to other class.
 * TODO this is temporal logic..
 * @type {string}
 */
sahagin.TestDocResolver.JS_LOCAL_VAR = null;

/**
 * exposed to other class.
 * TODO this is temporal logic..
 * @type {string}
 */
sahagin.TestDocResolver.JS_VAR_ASSIGN = null;

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
  var conditionalFound = false;
  while ((matched = regexp.exec(testDoc)) != null) {
    var variable = matched[0];
    variable = variable.substring(1, variable.length - 1); // trim head and tail braces
    var varIndex = parseInt(variable, 10);
    if (isNaN(varIndex)) {
      // not index pattern
      if (matched == "this") {
        continue;
      } else if (sahagin.CommonUtils.startsWith(matched, "if:")) {
        conditionalFound = true;
        continue;
      } else if (conditionalFound && matched == "end") {
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
 * @param {sahagin.SubMethodInvoke} methodInvoke
 * @param {string} variable
 * @returns {Object} object with property "codes" and "empty".
 * "empty" is whether argument for variable is actually specified.
 * {this} and variable length argument can be empty
 */
sahagin.TestDocResolver.methodInvokeNormalVariableCodes = function(methodInvoke, variable) {
  var method = methodInvoke.getSubMethod();

  if (variable == "this") {
    var variableCode = methodInvoke.getThisInstance();
    var empty = false;
    if (variableCode == null) {
      // When called inside the class on which this method is defined,
      // set the class name for {this} keyword
      variableCode = new UnknownCode();
      variableCode.setOriginal(methodInvoke.getSubMethod().getTestClass().getSimpleName());
      empty = true;
    }
    return {codes: [variableCode], empty: empty};
  }

  var varIndex = parseInt(variable, 10);
  if (isNaN(varIndex)) {
    // not index pattern
    varIndex = method.getArgVariables().indexOf(variable);
  }

  if (varIndex < 0) {
    // maybe fails to calculate varIndex from variable
    throw new Error(sahagin.CommonUtils.strFormat(
        sahagin.TestDocResolver.MSG_INVALID_PLACEHOLDER, method.getQualifiedName(), variable));
  }

  // TODO maybe should check that varIndex >= method.getArgVariables().length
  // only when method actually has argument variable information

  if (!method.hasVariableLengthArg()) {
    if (varIndex >= methodInvoke.getArgs().length) {
      throw new Error(sahagin.CommonUtils.strFormat(
          sahagin.TestDocResolver.MSG_INVALID_PLACEHOLDER, method.getQualifiedName(), variable));
    }
    return {codes: [methodInvoke.getArgs()[varIndex]], empty: false};
  }

  if (varIndex == method.getVariableLengthArgIndex()) {
    // variable length argument.
    // - TestDoc for variable length argument
    //   is the comma connected string of all rest arguments.
    // - TestDoc for variable length argument
    //   is empty string if no rest arguments exist.
    var variableCodes = new Array();
    for (var i = varIndex; i < methodInvoke.getArgs().length; i++) {
      variableCodes.push(methodInvoke.getArgs()[i]);
    }
    return {codes: variableCodes, empty: (variableCodes.length == 0)};
  }

  if (varIndex > method.getVariableLengthArgIndex()) {
    throw new Error(sahagin.CommonUtils.strFormat(
        sahagin.TestDocResolver.MSG_INVALID_PLACEHOLDER, method.getQualifiedName(), variable));
  }

  return {codes: [methodInvoke.getArgs()[varIndex]], empty: false};
};

/**
 * @param {sahagin.SubMethodInvoke} methodInvoke
 * @param {string} variable
 * @param {Array.<string>} placeholderResolvedParentMethodArgTestDocs
 * @returns {string}
 */
sahagin.TestDocResolver.methodInvokeNormalVariableTestDoc
= function(methodInvoke, variable, placeholderResolvedParentMethodArgTestDocs) {
  var variableCodes
  = sahagin.TestDocResolver.methodInvokeNormalVariableCodes(methodInvoke, variable).codes;
  var testDoc = "";
  for (var i = 0; i < variableCodes.length; i++) {
    if (i != 0) {
      testDoc = testDoc + ", ";
    }
    testDoc = testDoc + sahagin.TestDocResolver.methodTestDocSub(
        variableCodes[i], placeholderResolvedParentMethodArgTestDocs);
  }
  return testDoc;
};

/**
 * @param {sahagin.SubMethodInvoke} methodInvoke
 * @param {string} condVariable
 * @param {Array.<string>} placeholderResolvedParentMethodArgTestDocs
 * @returns {boolean}
 */
sahagin.TestDocResolver.validateCondVariable = function(
    methodInvoke, condVariable, placeholderResolvedParentMethodArgTestDocs) {
  var splitted = condVariable.split(":");
  if (splitted.length != 2) {
    throw new Error(sahagin.CommonUtils.strFormat(
        sahagin.TestDocResolver.MSG_INVALID_PLACEHOLDER,
        methodInvoke.getSubMethod().getQualifiedName(), condVariable));
  }
  var expressionVariable = splitted[1];
  // returns true if argument for expressionVariable is not empty
  return !sahagin.TestDocResolver.methodInvokeNormalVariableCodes(
      methodInvoke, expressionVariable).empty;
};

sahagin.TestDocResolver.methodInvokeTestDoc = function(
    methodInvoke, placeholderResolvedParentMethodArgTestDocs) {
  var method = methodInvoke.getSubMethod();
  if (method.getTestDoc() == null) {
    return methodInvoke.getOriginal();
  }

  // replace all placeholders by RegExp
  var matched;
  var buf = '';
  var dummyBuf = '';
  var prevEnd = 0;
  var testDoc = method.getTestDoc();
  var regexp = sahagin.TestDocResolver.generatePlaceHolderRegExp();
  var ifFound = false;
  var insideIf = false;
  var skip = false;
  while ((matched = regexp.exec(testDoc)) !== null) {
    var variable = matched[0];
    var matchStart = matched.index;
    var matchEnd = matchStart + variable.length;
    variable = variable.substring(1, variable.length - 1); // trim head and tail braces

    if (sahagin.CommonUtils.startsWith(variable, "if:")) {
      if (insideIf) {
        // nested if is not supported yet
        throw new Error(sahagin.CommonUtils.strFormat(
            sahagin.TestDocResolver.MSG_INVALID_PLACEHOLDER_POS,
            method.getQualifiedName(), variable));
      }
      buf = buf + testDoc.substring(prevEnd, matchStart);
      ifFound = true;
      insideIf = true;
      skip = !sahagin.TestDocResolver.validateCondVariable(
          methodInvoke, variable, placeholderResolvedParentMethodArgTestDocs);
    } else if (variable == "end" && ifFound) {
      if (!insideIf) {
        throw new Error(sahagin.CommonUtils.strFormat(
            sahagin.TestDocResolver.MSG_INVALID_PLACEHOLDER_POS,
            method.getQualifiedName(), variable));
      }
      // abort matched data if skip flag is true
      if (!skip) {
        buf = buf + testDoc.substring(prevEnd, matchStart);
      }
      insideIf = false;
      skip = false;
    } else if (skip) {
      // abort matched data
    } else {
      var variableTestDoc = sahagin.TestDocResolver.methodInvokeNormalVariableTestDoc(
            methodInvoke, variable, placeholderResolvedParentMethodArgTestDocs);
      buf = buf + testDoc.substring(prevEnd, matchStart) + variableTestDoc;
    }
    prevEnd = matchEnd;
  }
  if (insideIf) {
    throw new Error(sahagin.CommonUtils.strFormat(
        sahagin.TestDocResolver.MSG_STATEMENT_NOT_CLOSED,
        method.getQualifiedName()));
  }
  buf = buf + testDoc.substring(prevEnd, testDoc.length);
  return buf.toString();
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
    return sahagin.TestDocResolver.methodInvokeTestDoc(
        methodInvoke, placeholderResolvedParentMethodArgTestDocs);
  } else if (code instanceof sahagin.LocalVar) {
    var localVar = code;
    // TODO implement locale handling logic.. very poor logic..
    return sahagin.CommonUtils.strFormat(sahagin.TestDocResolver.JS_LOCAL_VAR,
        localVar.getName());
  } else if (code instanceof sahagin.Field) {
    var field = code;
    var testDoc = field.getField().getTestDoc();
    if (testDoc == null) {
      // TODO resolve {this} keyword in the testDoc of the Field
      return code.getOriginal();
    } else {
      return testDoc;
    }
  } else if (code instanceof sahagin.VarAssign) {
    var assign = code;
    var variableTestDoc = sahagin.TestDocResolver.methodTestDocSub(
        assign.getVariable(), placeholderResolvedParentMethodArgTestDocs);
    var valueTestDoc = sahagin.TestDocResolver.methodTestDocSub(
        assign.getValue(), placeholderResolvedParentMethodArgTestDocs);
    // TODO implement locale handling logic.. very poor logic..
    return sahagin.CommonUtils.strFormat(sahagin.TestDocResolver.JS_VAR_ASSIGN,
        valueTestDoc, variableTestDoc);
  } else if (code instanceof sahagin.ClassInstance) {
    var classInstance = code;
    var testDoc = classInstance.getTestClass().getTestDoc();
    if (testDoc == null || testDoc == "") {
      return classInstance.getTestClass().getSimpleName();
    } else {
      return testDoc;
    }
  } else if (code instanceof sahagin.TestStep) {
    var testStep = code;
    var result = "";
    if (testStep.getLabel() != null) {
      result = testStep.getLabel() + ": ";
    }
    if (testStep.getText() != null) {
      result = result + testStep.getText();
    }
    return result;
  } else if (code instanceof sahagin.TestStepLabel) {
    var testStepLabel = code;
    var result = "";
    if (testStepLabel.getLabel() != null) {
      // testStep text does not contain placeholder
      result = testStepLabel.getLabel() + ": ";
    }
    if (testStepLabel.getText() != null) {
      // testStepLabel text does not contain placeholder
      result = result + testStepLabel.getText();
    }
    return result;
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
 * Returns first found page testDoc.
 * returns null if page testDoc not found
 * @param {sahagin.Code} code
 * @returns {sahagin.PageClass}
 */
sahagin.TestDocResolver.codePage = function(code) {
  if (code instanceof sahagin.SubMethodInvoke) {
    var invoke = code;
    var testClass = invoke.getSubMethod().getTestClass();
    if (testClass instanceof sahagin.PageClass) {
      return testClass;
    }
    var thisPage = sahagin.TestDocResolver.codePage(invoke.getThisInstance());
    if (thisPage != null) {
      return thisPage;
    }
    for (var i = 0; i < invoke.getArgs().length; i++) {
      var argPage = sahagin.TestDocResolver.codePage(invoke.getArgs()[i]);
      if (argPage != null) {
        return argPage;
      }
    }
  } else if (code instanceof sahagin.Field) {
    var field = code;
    var testClass = field.getField().getTestClass();
    if (testClass instanceof sahagin.PageClass) {
      return testClass;
    }
    var thisPage = sahagin.TestDocResolver.codePage(field.getThisInstance());
    if (thisPage != null) {
      return thisPage;
    }
  } else if (code instanceof sahagin.VarAssign) {
    var assign = code;
    var varPage = sahagin.TestDocResolver.codePage(assign.getVariable());
    if (varPage != null) {
      return varPage;
    }
    var valuePage = sahagin.TestDocResolver.codePage(assign.getValue());
    if (valuePage != null) {
      return valuePage;
    }
  } else if (code instanceof sahagin.ClassInstance) {
    var classInstance = code;
    var testClass = classInstance.getTestClass()
    if (testClass instanceof sahagin.PageClass) {
        return testClass;
    }
  }
  return null;
};
