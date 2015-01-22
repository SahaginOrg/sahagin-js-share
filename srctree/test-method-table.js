/**
 * @class
 */
sahagin.TestMethodTable = function() {

  /**
   * @type {Array.<sahagin.TestMethod>}
   */
  this.testMethods = new Array();
};

/**
 * @returns {Array.<sahagin.TestMethod>}
 */
sahagin.TestMethodTable.prototype.getTestMethods = function() {
  return this.testMethods;
};

/**
 * @param {sahagin.TestMethod} testMethod
 */
sahagin.TestMethodTable.prototype.addTestMethod = function(testMethod) {
  this.testMethods.push(testMethod);
}

/**
 * returns null if not found
 * @param {string} key
 * @return {sahagin.TestMethod}
 */
sahagin.TestMethodTable.prototype.getByKey = function(key) {
  if (key == null || key == undefined) {
    throw new Error(key);
  }
  for (var i = 0; i < this.testMethods.length; i++) {
    var testMethod = this.testMethods[i];
    if (key == testMethod.getKey()) {
      return testMethod;
    }
  }
  return null;
};

/**
 * @param {string} qualifiedName
 * @return {Array.<sahagin.TestMethod>}
 */
sahagin.TestMethodTable.prototype.getByQualifiedName = function(qualifiedName) {
  if (qualifiedName == null || key == undefined) {
    throw new Error(qualifiedName);
  }
  var result = new Array();
  for (var i = 0; i < this.testMethods.length; i++) {
    var testMethod = this.testMethods[i];
    if (qualifiedName == testMethod.getQualifiedName()) {
      result.push(testMethod);
    }
  }
  return result;
};

/**
 * @returns {Object.<string, *>}
 */
sahagin.TestMethodTable.prototype.toYamlObject = function() {
  var result = new Object();
  result['methods'] = sahagin.YamlUtils.toYamlObjectList(this.testMethods);
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.TestMethodTable.prototype.fromYamlObject = function(yamlObject) {
  var testMethodsYamlObj = sahagin.YamlUtils.getYamlObjectListValue(yamlObject, 'methods');
  this.testMethods = new Array();
  for (var i = 0; i < testMethodsYamlObj.length; i++) {
    var testMethod = sahagin.TestMethod.newInstanceFromYamlObject(testMethodsYamlObj[i]);
    this.testMethods.push(testMethod);
  }
};