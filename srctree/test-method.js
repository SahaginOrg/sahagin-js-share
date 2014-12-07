/**
 * @class
 */
sahagin.TestMethod = function() {
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
sahagin.inherits(sahagin.TestMethod, sahagin.TestFunction);

/**
 * @type {string}
 */
sahagin.TestMethod.TYPE = 'method';

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
sahagin.TestMethod.prototype.getType = function() {
  return sahagin.TestMethod.TYPE;
};

/**
 * @returns {Object.<string, *>}
 */
sahagin.TestMethod.prototype.toYamlObject = function() {
  var result = sahagin.base(this, 'toYamlObject');
  result['classKey'] = this.testClassKey;
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.TestMethod.prototype.fromYamlObject = function(yamlObject) {
  sahagin.base(this, 'fromYamlObject', yamlObject);
  this.testClass = null;
  this.testClassKey = sahagin.YamlUtils.getStrValue(yamlObject, 'classKey');
};