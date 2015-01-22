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
   * function qualified name is not necessarily unique
   * (because of overloaded methods)
   * @private
   * @type {string}
   */
  this.qualifiedName = null;

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
  if (this.qualifiedName == null || this.qualifiedName == undefined) {
    return null;
  }
  var lastIndex = this.qualifiedName.lastIndexOf('.'); // TODO name separator is always dot ??
  if (lastIndex == -1) {
    return this.qualifiedName;
  }
  return this.qualifiedName.substr(lastIndex + 1);
};

/**
 * @returns {string}
 */
sahagin.TestMethod.prototype.getQualifiedName = function() {
  return this.qualifiedName;
};

/**
 * @param {string} qualifiedName
 */
sahagin.TestMethod.prototype.setQualifiedName = function(qualifiedName) {
  this.qualifiedName = qualifiedName;
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
  result['name'] = this.qualifiedName;
  result['testDoc'] = this.testDoc;
  result['capture'] = this.captureStyle;
  result['argVariables'] = this.argVariables;
  result['codeBody'] = sahagin.YamlUtils.toYamlObjectList(this.codeBody);
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.TestMethod.prototype.fromYamlObject = function(yamlObject) {
  this.testClass = null;
  this.testClassKey = sahagin.YamlUtils.getStrValue(yamlObject, 'classKey');
  this.key = sahagin.YamlUtils.getStrValue(yamlObject, 'key');
  this.qualifiedName = sahagin.YamlUtils.getStrValue(yamlObject, 'name');
  this.testDoc = sahagin.YamlUtils.getStrValue(yamlObject, 'testDoc');
  // capture is not mandatory
  this.capture = sahagin.YamlUtils.getStrValue(yamlObject, 'stepInCapture', true);
  if (this.capture == null) {
    this.capture = sahagin.CaptureStyle.getDefault();
  }
  this.argVariables = sahagin.YamlUtils.getStrListValue(yamlObject, 'argVariables');
  var codeBodyYamlObj = sahagin.YamlUtils.getYamlObjectListValue(yamlObject, 'codeBody');
  this.codeBody = new Array();
  for (var i = 0; i < codeBodyYamlObj.length; i++) {
    var codeLine = new sahagin.CodeLine();
    codeLine.fromYamlObject(codeBodyYamlObj[i]);
    this.codeBody.push(codeLine);
  }
};