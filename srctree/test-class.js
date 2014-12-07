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
   * @type {Array.<string>}
   */
  this.testMethodKeys = new Array();
  
  /**
   * @private
   * @type {Array.<sahagin.TestMethod>}
   */
  this.testMethods = new Array();
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
  result['type'] = this.getType();
  result['key'] = this.key;
  result['name'] = this.qualifiedName;
  result['testDoc'] = this.testDoc;
  result['methodKeys'] = this.testMethodKeys;
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.TestClass.prototype.fromYamlObject = function(yamlObject) {
  sahagin.YamlUtils.strValueEqualsCheck(yamlObject, 'type', this.getType());
  this.key = sahagin.YamlUtils.getStrValue(yamlObject, 'key');
  this.qualifiedName = sahagin.YamlUtils.getStrValue(yamlObject, 'name');
  this.testDoc = sahagin.YamlUtils.getStrValue(yamlObject, 'testDoc');
  this.testMethodKeys = sahagin.YamlUtils.getStrListValue(yamlObject, 'methodKeys');
  this.testMethods.length = 0;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.TestClass.newInstanceFromYamlObject = function(yamlObject) {
  var type = sahagin.YamlUtils.getStrValue(yamlObject, 'type');
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
