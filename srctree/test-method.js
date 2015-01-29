/**
 * @class
 */
sahagin.TestMethod = function() {

  /**
   * @private
   * @type {string}
   */
  this.testClassKey = null;

  /**
   * @private
   * @type {sahagin.TestClass}
   */
  this.testClass = null;

  /**
   * unique key
   * @private
   * @type {string}
   */
  this.key = null;

  /**
   * function simple name is not necessarily unique
   * (because of overloaded methods)
   * @private
   * @type {string}
   */
  this.simpleName = null;

  /**
   * @private
   * @type {string}
   */
  this.testDoc = null;

  /**
   * @private
   * @type {string}
   */
  this.captureStyle = sahagin.CaptureStyle.getDefault();

  /**
   * @private
   * @type {Array.<string>}
   */
  this.argVariables = new Array();

  /**
   * @private
   * @type {number}
   */
  this.variableLengthArgIndex = -1;

  /**
   * @private
   * @type {Array.<sahagin.CodeLine>}
   */
  this.codeBody = new Array();
};

/**
 * @returns {string}
 */
sahagin.TestMethod.prototype.getTestClassKey = function() {
  return this.testClassKey;
};

/**
 * @param {string} testClassKey
 */
sahagin.TestMethod.prototype.setTestClassKey = function(testClassKey) {
  this.testClassKey = testClassKey;
};

/**
 * @returns {sahagin.TestClass}
 */
sahagin.TestMethod.prototype.getTestClass = function() {
  return this.testClass;
};

/**
 * @param {sahagin.TestClass} testClass
 */
sahagin.TestMethod.prototype.setTestClass = function(testClass) {
  this.testClass = testClass;
};

/**
 * @returns {string}
 */
sahagin.TestMethod.prototype.getKey = function() {
  return this.key;
};

/**
 * @param {string} key
 */
sahagin.TestMethod.prototype.setKey = function(key) {
  this.key = key;
};

/**
 * @returns {string}
 */
sahagin.TestMethod.prototype.getSimpleName = function() {
  return this.simpleName;
};

/**
 * @param {string} simpleName
 */
sahagin.TestMethod.prototype.setSimpleName = function(simpleName) {
  this.simpleName = simpleName;
};

/**
 * @returns {string}
 */
sahagin.TestMethod.prototype.getQualifiedName = function() {
  if (this.testClass == null || this.simpleName == null) {
    return simpleName;
  } else {
    return this.testClass.getQualifiedName() + "." + this.simpleName;
  }
};

/**
 * @returns {string}
 */
sahagin.TestMethod.prototype.getTestDoc = function() {
  return this.testDoc;
};

/**
 * @param {string} testDoc
 */
sahagin.TestMethod.prototype.setTestDoc = function(testDoc) {
  this.testDoc = testDoc;
};

/**
 * @returns {string}
 */
sahagin.TestMethod.prototype.getCaptureStyle = function() {
  return this.captureStyle;
};

/**
 * @param {string} captureStyle
 */
sahagin.TestMethod.prototype.setCaptureStyle = function(captureStyle) {
  if (captureStyle == sahagin.CaptureStyle.NONE
      || captureStyle == sahagin.CaptureStyle.STEP_IN_ONLY) {
    throw new Error("not supported yet: " + captureStyle);
  }
  this.captureStyle = captureStyle;
};

/**
 * @returns {Array.<string>}
 */
sahagin.TestMethod.prototype.getArgVariables = function() {
  return this.argVariables;
};

/**
 * @param {string} argVariable
 */
sahagin.TestMethod.prototype.addArgVariable = function(argVariable) {
  this.argVariables.push(argVariable);
};

/**
 * @returns {boolean}
 */
sahagin.TestMethod.prototype.hasVariableLengthArg = function() {
  return this.variableLengthArgIndex != -1;
};

/**
 * @returns {number}
 */
sahagin.TestMethod.prototype.getVariableLengthArgIndex = function() {
  return this.variableLengthArgIndex;
};

/**
 * @param {number} variableLengthArgIndex
 */
sahagin.TestMethod.prototype.setVariableLengthArgIndex = function(variableLengthArgIndex) {
  this.variableLengthArgIndex = variableLengthArgIndex;
};

/**
 * @returns {Array.<sahagin.CodeLine>}
 */
sahagin.TestMethod.prototype.getCodeBody = function() {
  return this.codeBody;
};

/**
 * @param {sahagin.CodeLine} codeLine
 */
sahagin.TestMethod.prototype.addCodeBody = function(codeLine) {
  this.codeBody.push(codeLine);
};

/**
 * @returns {Object.<string, *>}
 */
sahagin.TestMethod.prototype.toYamlObject = function() {
  var result = new Object();
  result['classKey'] = this.testClassKey;
  result['key'] = this.key;
  result['name'] = this.simpleName;
  if (this.testDoc !== null && this.testDoc !== undefined) {
    result['testDoc'] = this.testDoc;
  }
  if (this.captureStyle != sahagin.CaptureStyle.getDefault()) {
    result['capture'] = this.captureStyle;
  }
  if (this.argVariables.length != 0) {
    result['argVariables'] = this.argVariables;
  }
  if (this.variableLengthArgIndex != -1) {
      result['varLengthArgIndex'] = this.variableLengthArgIndex;
  }
  if (this.codeBody.length != 0) {
    result['codeBody'] = sahagin.YamlUtils.toYamlObjectList(this.codeBody);
  }
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.TestMethod.prototype.fromYamlObject = function(yamlObject) {
  this.testClass = null;
  this.testClassKey = sahagin.YamlUtils.getStrValue(yamlObject, 'classKey');
  this.key = sahagin.YamlUtils.getStrValue(yamlObject, 'key');
  this.simpleName = sahagin.YamlUtils.getStrValue(yamlObject, 'name');
  this.testDoc = sahagin.YamlUtils.getStrValue(yamlObject, 'testDoc', true);
  // capture is not mandatory
  this.capture = sahagin.YamlUtils.getStrValue(yamlObject, 'stepInCapture', true);
  if (this.capture == null) {
    this.capture = sahagin.CaptureStyle.getDefault();
  }
  this.argVariables = sahagin.YamlUtils.getStrListValue(yamlObject, 'argVariables', true);

  var variableLengthArgIndexObj = sahagin.YamlUtils.getIntValue(yamlObject, "varLengthArgIndex", true);
  if (variableLengthArgIndexObj === null) {
    variableLengthArgIndex = -1;
  } else {
    variableLengthArgIndex = variableLengthArgIndexObj;
  }
  var codeBodyYamlObj = sahagin.YamlUtils.getYamlObjectListValue(yamlObject, 'codeBody', true);
  this.codeBody = new Array();
  for (var i = 0; i < codeBodyYamlObj.length; i++) {
    var codeLine = new sahagin.CodeLine();
    codeLine.fromYamlObject(codeBodyYamlObj[i]);
    this.codeBody.push(codeLine);
  }
};