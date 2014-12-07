/**
 * @class
 */
sahagin.TestFunction = function() {

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
   * @type {boolean}
   */
  this.stepInCapture = false;

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
 * @private
 * @type {string}
 */
sahagin.TestFunction.MSG_INVALID_TYPE = 'invalid type: {0}';

/**
 * @type {string}
 */
sahagin.TestFunction.TYPE = 'function';

/**
 * @returns {string}
 */
sahagin.TestFunction.prototype.getKey = function() {
  return this.key;
};

/**
 * @param {string} key
 */
sahagin.TestFunction.prototype.setKey = function(key) {
  this.key = key;
};

/**
 * @returns {string}
 */
sahagin.TestFunction.prototype.getSimpleName = function() {
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
sahagin.TestFunction.prototype.getQualifiedName = function() {
  return this.qualifiedName;
};

/**
 * @param {string} qualifiedName
 */
sahagin.TestFunction.prototype.setQualifiedName = function(qualifiedName) {
  this.qualifiedName = qualifiedName;
};

/**
 * @returns {string}
 */
sahagin.TestFunction.prototype.getTestDoc = function() {
  return this.testDoc;
};

/**
 * @param {string} testDoc
 */
sahagin.TestFunction.prototype.setTestDoc = function(testDoc) {
  this.testDoc = testDoc;
};

/**
 * @returns {boolean}
 */
sahagin.TestFunction.prototype.isStepInCapture = function() {
  return this.stepInCapture;
};

/**
 * @param {boolean} stepInCapture
 */
sahagin.TestFunction.prototype.setStepInCapture = function(stepInCapture) {
  this.stepInCapture = stepInCapture;
};

/**
 * @returns {Array.<string>}
 */
sahagin.TestFunction.prototype.getArgVariables = function() {
  return this.argVariables;
};

/**
 * @param {string} argVariable
 */
sahagin.TestFunction.prototype.addArgVariable = function(argVariable) {
  this.argVariables.push(argVariable);
};

/**
 * @returns {Array.<sahagin.CodeLine>}
 */
sahagin.TestFunction.prototype.getCodeBody = function() {
  return this.codeBody;
};

/**
 * @param {sahagin.CodeLine} codeLine
 */
sahagin.TestFunction.prototype.addCodeBody = function(codeLine) {
  this.codeBody.push(codeLine);
};

/**
 * @returns {string}
 */
sahagin.TestFunction.prototype.getType = function() {
  return sahagin.TestFunction.TYPE;
};

/**
 * @returns {Object.<string, *>}
 */
sahagin.TestFunction.prototype.toYamlObject = function() {
  var result = new Object();
  result['type'] = this.getType();
  result['key'] = this.key;
  result['name'] = this.qualifiedName;
  result['testDoc'] = this.testDoc;
  result['stepInCapture'] = this.stepInCapture;
  result['argVariables'] = this.argVariables;
  result['codeBody'] = sahagin.YamlUtils.toYamlObjectList(this.codeBody);
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.TestFunction.prototype.fromYamlObject = function(yamlObject) {
  sahagin.YamlUtils.strValueEqualsCheck(yamlObject, 'type', this.getType());
  this.key = sahagin.YamlUtils.getStrValue(yamlObject, 'key');
  this.qualifiedName = sahagin.YamlUtils.getStrValue(yamlObject, 'name');
  this.testDoc = sahagin.YamlUtils.getStrValue(yamlObject, 'testDoc');
  this.stepInCapture = sahagin.YamlUtils.getBooleanValue(yamlObject, 'stepInCapture');
  this.argVariables = sahagin.YamlUtils.getStrListValue(yamlObject, 'argVariables');
  var codeBodyYamlObj = sahagin.YamlUtils.getYamlObjectListValue(yamlObject, 'codeBody');
  this.codeBody = new Array();
  for (var i = 0; i < codeBodyYamlObj.length; i++) {
    var codeLine = new sahagin.CodeLine();
    codeLine.fromYamlObject(codeBodyYamlObj[i]);
    this.codeBody.push(codeLine);
  }
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.TestFunction.newInstanceFromYamlObject = function(yamlObject) {
  var type = sahagin.YamlUtils.getStrValue(yamlObject, 'type');
  var result;
  if (type == sahagin.TestFunction.TYPE) {
    result = new sahagin.TestFunction();
  } else if (type == sahagin.TestMethod.TYPE) {
    result = new sahagin.TestMethod();
  } else {
    throw new Error(sahagin.CommonUtils.strFormat(
        sahagin.TestFunction.MSG_INVALID_TYPE, type));
  }
  result.fromYamlObject(yamlObject);
  return result;
};