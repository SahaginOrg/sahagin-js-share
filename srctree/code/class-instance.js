/**
 * @class
 */
sahagin.ClassInstance = function() {
  sahagin.base(this);

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
};
sahagin.inherits(sahagin.ClassInstance, sahagin.Code);

/**
 * @type {string}
 */
sahagin.ClassInstance.TYPE = "classInstance";

/**
 * @returns {string}
 */
sahagin.ClassInstance.prototype.getTestClassKey = function() {
  return this.testClassKey;
};

/**
 * @param {string} testClassKey
 */
sahagin.ClassInstance.prototype.setTestClassKey = function(testClassKey) {
  this.testClassKey = testClassKey;
};

/**
 * @returns {sahagin.TestClass}
 */
sahagin.ClassInstance.prototype.getTestClass = function() {
  return this.testClass;
};

/**
 * @param {sahagin.TestClass} testClass
 */
sahagin.ClassInstance.prototype.setTestClass = function(testClass) {
  this.testClass = testClass;
};

/**
 * @returns {string}
 */
sahagin.ClassInstance.prototype.getType = function() {
  return sahagin.ClassInstance.TYPE;
};

/**
 * @returns {Object.<String, *>}
 */
sahagin.ClassInstance.prototype.toYamlObject = function() {
  var result = sahagin.base(this, 'toYamlObject');
  result['classKey'] = this.testClassKey;
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.ClassInstance.prototype.fromYamlObject = function(yamlObject) {
  sahagin.base(this, 'fromYamlObject', yamlObject);
  this.testClassKey = sahagin.YamlUtils.getStrValue(yamlObject, 'classKey');
};