/**
 * @class
 */
sahagin.TestField = function() {

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
   * @type {sahagin.Code}
   */
  this.value = null;
};


/**
 * @returns {string}
 */
sahagin.TestField.prototype.getTestClassKey = function() {
  return this.testClassKey;
};

/**
 * @param {string} testClassKey
 */
sahagin.TestField.prototype.setTestClassKey = function(testClassKey) {
  this.testClassKey = testClassKey;
};

/**
 * @returns {sahagin.TestClass}
 */
sahagin.TestField.prototype.getTestClass = function() {
  return this.testClass;
};

/**
 * @param {sahagin.TestClass} testClass
 */
sahagin.TestField.prototype.setTestClass = function(testClass) {
  this.testClass = testClass;
};

/**
 * @returns {string}
 */
sahagin.TestField.prototype.getKey = function() {
  return this.key;
};

/**
 * @param {string} key
 */
sahagin.TestField.prototype.setKey = function(key) {
  this.key = key;
};

/**
 * @returns {string}
 */
sahagin.TestField.prototype.getSimpleName = function() {
  return this.simpleName;
};

/**
 * @param {string} simpleName
 */
sahagin.TestField.prototype.setSimpleName = function(simpleName) {
  this.simpleName = simpleName;
};

/**
 * @returns {string}
 */
sahagin.TestField.prototype.getQualifiedName = function() {
  if (this.testClass == null || this.simpleName == null) {
    return simpleName;
  } else {
    return this.testClass.getQualifiedName() + "." + this.simpleName;
  }
};

/**
 * @returns {string}
 */
sahagin.TestField.prototype.getTestDoc = function() {
  return this.testDoc;
};

/**
 * @param {string} testDoc
 */
sahagin.TestField.prototype.setTestDoc = function(testDoc) {
  this.testDoc = testDoc;
};

/**
 * @returns {sahagin.Code}
 */
sahagin.TestField.prototype.getValue = function() {
  return this.value;
};

/**
 * @value {sahagin.Code} value
 */
sahagin.TestField.prototype.setValue = function(value) {
  this.value = value;
};

/**
 * @returns {Object.<string, *>}
 */
sahagin.TestField.prototype.toYamlObject = function() {
  var result = new Object();
  result['classKey'] = this.testClassKey;
  result['key'] = this.key;
  result['name'] = this.simpleName;
  if (this.testDoc !== null && this.testDoc !== undefined) {
    result['testDoc'] = this.testDoc;
  }
  result['value'] = YamlUtils.toYamlObject(value);
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.TestField.prototype.fromYamlObject = function(yamlObject) {
  this.testClass = null;
  this.testClassKey = sahagin.YamlUtils.getStrValue(yamlObject, 'classKey');
  this.key = sahagin.YamlUtils.getStrValue(yamlObject, 'key');
  this.simpleName = sahagin.YamlUtils.getStrValue(yamlObject, 'name');
  this.testDoc = sahagin.YamlUtils.getStrValue(yamlObject, 'testDoc', true);
  var valueYamlObj = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'value');
  this.value = sahagin.Code.newInstanceFromYamlObject(valueYamlObj);
};