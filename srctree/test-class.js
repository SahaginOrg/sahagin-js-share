/**
 * @class
 */
sahagin.TestClass = function() {

  /**
   * unique key
   * @private
   * @type {string}
   */
  this.key = null;

  /**
   * class qualified name must be unique
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
  this.delegateToTestClassKey = null;

  /**
   * @private
   * @type {sahagin.TestClass}
   */
  this.delegateToTestClass = null;

  /**
   * @private
   * @type {Array.<string>}
   */
  this.testMethodKeys = new Array();

  /**
   * @private
   * @type {Array.<sahagin.TestMethod>}
   */
  this.testMethods = new Array();

  /**
   * @private
   * @type {Array.<string>}
   */
  this.testFieldKeys = new Array();

  /**
   * @private
   * @type {Array.<sahagin.TestField>}
   */
  this.testFields = new Array();
};

/**
 * @private
 * @type {string}
 */
sahagin.TestClass.MSG_INVALID_TYPE = 'invalid type: {0}';

/**
 * @type {string}
 */
sahagin.TestClass.TYPE = 'class';

/**
 * @type {string}
 */
sahagin.TestClass.DEFAULT_TYPE = sahagin.TestClass.TYPE;

/**
 * @returns {string}
 */
sahagin.TestClass.prototype.getKey = function() {
  return this.key;
};

/**
 * @param {string} key
 */
sahagin.TestClass.prototype.setKey = function(key) {
  this.key = key;
};

/**
 * @returns {string}
 */
sahagin.TestClass.prototype.getSimpleName = function() {
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
sahagin.TestClass.prototype.getQualifiedName = function() {
  return this.qualifiedName;
};

/**
 * @param {string} qualifiedName
 */
sahagin.TestClass.prototype.setQualifiedName = function(qualifiedName) {
  this.qualifiedName = qualifiedName;
};

/**
 * @returns {string}
 */
sahagin.TestClass.prototype.getTestDoc = function() {
  return this.testDoc;
};

/**
 * @param {string} testDoc
 */
sahagin.TestClass.prototype.setTestDoc = function(testDoc) {
  this.testDoc = testDoc;
};

/**
 * @returns {string}
 */
sahagin.TestClass.prototype.getDelegateToTestClassKey = function() {
  return this.delegateToTestClassKey;
};

/**
 * @param {string} delegateToTestClassKey
 */
sahagin.TestClass.prototype.setDelegateToTestClassKey = function(delegateToTestClassKey) {
  this.delegateToTestClassKey = delegateToTestClassKey;
};

/**
 * @returns {sahagin.TestClass}
 */
sahagin.TestClass.prototype.getDelegateToTestClass = function() {
  return this.delegateToTestClass;
};

/**
 * @param {sahagin.TestClass} delegateToTestClass
 */
sahagin.TestClass.prototype.setDelegateToTestClass = function(delegateToTestClass) {
  this.delegateToTestClass = delegateToTestClass;
};

/**
 * @returns {Array.<string>}
 */
sahagin.TestClass.prototype.getTestMethodKeys = function() {
  return this.testMethodKeys;
};

/**
 * @param {string} testMethodKey
 */
sahagin.TestClass.prototype.addTestMethodKey = function(testMethodKey) {
  this.testMethodKeys.push(testMethodKey);
};

/**
 * @returns {Array.<sahagin.TestMethod>}
 */
sahagin.TestClass.prototype.getTestMethods = function() {
  return this.testMethods;
};

/**
 * @param {sahagin.TestMethod} testMethod
 */
sahagin.TestClass.prototype.addTestMethod = function(testMethod) {
  this.testMethods.push(testMethod);
};

/**
 *
 */
sahagin.TestClass.prototype.clearTestMethods = function() {
  this.testMethods.length = 0;
};

/**
 * @returns {Array.<string>}
 */
sahagin.TestClass.prototype.getTestFieldKeys = function() {
  return this.testFieldKeys;
};

/**
 * @param {string} testFieldKey
 */
sahagin.TestClass.prototype.addTestFieldKey = function(testFieldKey) {
  this.testFieldKeys.push(testFieldKey);
};

/**
 * @returns {Array.<sahagin.TestField>}
 */
sahagin.TestClass.prototype.getTestFields = function() {
  return this.testFields;
};

/**
 * @param {sahagin.TestField} testField
 */
sahagin.TestClass.prototype.addTestField = function(testField) {
  this.testFields.push(testField);
};

/**
 *
 */
sahagin.TestClass.prototype.clearTestFields = function() {
  this.testFields.length = 0;
};

/**
 * @returns {string}
 */
sahagin.TestClass.prototype.getType = function() {
  return sahagin.TestClass.TYPE;
};

/**
 * @returns {Object.<string, *>}
 */
sahagin.TestClass.prototype.toYamlObject = function() {
  var result = new Object();
  result['key'] = this.key;
  result['qname'] = this.qualifiedName;
  if (this.getType() != sahagin.TestClass.DEFAULT_TYPE) {
    result['type'] = this.getType();
  }
  if (this.delegateToTestClassKey !== null) {
    result['delegateToClassKey'] = this.delegateToTestClassKey;
  }
  if (this.testDoc !== null && this.testDoc !== undefined) {
    result['testDoc'] = this.testDoc;
  }
  if (this.testMethodKeys.length != 0) {
    result['methodKeys'] = this.testMethodKeys;
  }
  if (this.testFieldKeys.length != 0) {
    result['fieldKeys'] = this.testFieldKeys;
  }
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.TestClass.prototype.fromYamlObject = function(yamlObject) {
  sahagin.YamlUtils.strValueEqualsCheck(
      yamlObject, 'type', this.getType(), sahagin.TestClass.DEFAULT_TYPE);
  this.key = sahagin.YamlUtils.getStrValue(yamlObject, 'key');
  this.qualifiedName = sahagin.YamlUtils.getStrValue(yamlObject, 'qname');
  this.testDoc = sahagin.YamlUtils.getStrValue(yamlObject, 'testDoc', true);
  this.delegateToTestClassKey = sahagin.YamlUtils.getStrValue(yamlObject, 'delegateToClassKey', true);
  this.delegateToTestClass = null;
  this.testMethodKeys = sahagin.YamlUtils.getStrListValue(yamlObject, 'methodKeys', true);
  this.testMethods.length = 0;
  this.testFieldKeys = sahagin.YamlUtils.getStrListValue(yamlObject, 'fieldKeys', true);
  this.testFields.length = 0;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.TestClass.newInstanceFromYamlObject = function(yamlObject) {
  var type = sahagin.YamlUtils.getStrValue(yamlObject, 'type', true);
  if (type === null) {
    type = sahagin.TestClass.DEFAULT_TYPE;
  }
  var result;
  if (type == sahagin.TestClass.TYPE) {
    result = new sahagin.TestClass();
  } else if (type == sahagin.PageClass.TYPE) {
    result = new sahagin.PageClass();
  } else {
    throw new Error(sahagin.CommonUtils.strFormat(
        sahagin.TestClass.MSG_INVALID_TYPE, type));
  }
  result.fromYamlObject(yamlObject);
  return result;
};
