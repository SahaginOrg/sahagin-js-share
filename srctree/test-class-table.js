/**
 * @class
 */
sahagin.TestClassTable = function() {
  
  /**
   * @private
   * @type {Array.<sahagin.TestClass>}
   */
  this.testClasses = new Array();
};

/**
 * @returns {Array.<sahagin.TestClass>} 
 */
sahagin.TestClassTable.prototype.getTestClasses = function() {
  return this.testClasses;
};

/**
 * @param {sahagin.TestClass} testClass
 */
sahagin.TestClassTable.prototype.addTestClass = function(testClass) {
  this.testClasses.push(testClass);
};

/**
 * returns null if not found
 * @param {string} key
 * @returns {sahagin.TestClass}
 */
sahagin.TestClassTable.prototype.getByKey = function(key) {
  if (key == null || key == undefined) {
    throw new Error(key);
  }
  for (var i = 0; i < this.testClasses.length; i++) {
    var testClass = this.testClasses[i];
    if (key == testClass.getKey()) {
      return testClass;
    }
  }
  return null;
};

/**
 * @returns {Object.<string, *>}
 */
sahagin.TestClassTable.prototype.toYamlObject = function() {
  var result = new Object();
  result['classes'] = sahagin.YamlUtils.toYamlObjectList(this.testClasses); 
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.TestClassTable.prototype.fromYamlObject = function(yamlObject) {
  var testClassesYamlObj = sahagin.YamlUtils.getYamlObjectListValue(yamlObject, 'classes');
  this.testClasses = new Array();
  for (var i = 0; i < testClassesYamlObj.length; i++) {
    var testClass = sahagin.TestClass.newInstanceFromYamlObject(testClassesYamlObj[i]);
    this.testClasses.push(testClass);
  }
};
