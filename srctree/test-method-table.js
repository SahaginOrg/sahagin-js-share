/**
 * @class
 */
sahagin.TestMethodTable = function() {

  /**
   * @private
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
};

/**
 * @returns {boolean}
 */
sahagin.TestMethodTable.prototype.isEmpty = function() {
  this.testMethods.length == 0;
};

/**
 * returns null if not found
 * @param {string} key
 * @returns {sahagin.TestMethod}
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
 * @param {string} classQualifiedName
 * @param {string} methodSimpleName
 * @returns {Array.<sahagin.TestMethod>}
 */
sahagin.TestMethodTable.prototype.getByName = function(
    classQualifiedName, methodSimpleName) {
  if (classQualifiedName == null || classQualifiedName == undefined) {
    throw new Error(classQualifiedName);
  }
  if (methodSimpleName == null || methodSimpleName == undefined) {
    throw new Error(methodSimpleName);
  }
  var result = new Array();
  for (var i = 0; i < this.testMethods.length; i++) {
    var testMethod = this.testMethods[i];
    if ((classQualifiedName == testMethod.getTestClass().getQualifiedName()) &&
        (methodSimpleName == testMethod.getSimpleName())) {
      result.push(testMethod);
    }
  }
  return result;
};

// TODO define sort method as well as Java implementation

/**
 * @returns {Object.<string, *>}
 */
sahagin.TestMethodTable.prototype.toYamlObject = function() {
  var result = new Object();
  if (!this.isEmpty()) {
    result['methods'] = sahagin.YamlUtils.toYamlObjectList(this.testMethods);
  }
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.TestMethodTable.prototype.fromYamlObject = function(yamlObject) {
  var testMethodsYamlObj = sahagin.YamlUtils.getYamlObjectListValue(yamlObject, 'methods', true);
  this.testMethods = new Array();
  for (var i = 0; i < testMethodsYamlObj.length; i++) {
    var testMethod = new sahagin.TestMethod();
    testMethod.fromYamlObject(testMethodsYamlObj[i]);
    this.testMethods.push(testMethod);
  }
};