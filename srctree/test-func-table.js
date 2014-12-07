/**
 * @class
 */
sahagin.TestFuncTable = function() {

  /**
   * @type {Array.<sahagin.TestFunction>}
   */
  this.testFunctions = new Array();
};

/**
 * @returns {Array.<sahagin.TestFunction>} 
 */
sahagin.TestFuncTable.prototype.getTestFunctions = function() {
  return this.testFunctions;
};

/**
 * @param {sahagin.TestFunction} testFunction
 */
sahagin.TestFuncTable.prototype.addTestFunction = function(testFunction) {
  this.testFunctions.push(testFunction);
}

/**
 * returns null if not found
 * @param {string} key
 * @return {sahagin.TestFunction}
 */
sahagin.TestFuncTable.prototype.getByKey = function(key) {
  if (key == null || key == undefined) {
    throw new Error(key);
  }
  for (var i = 0; i < this.testFunctions.length; i++) {
    var testFunction = this.testFunctions[i];
    if (key == testFunction.getKey()) {
      return testFunction;
    }
  }
  return null;
};

/**
 * @param {string} qualifiedName 
 * @return {Array.<sahagin.TestFunction>}
 */
sahagin.TestFuncTable.prototype.getByQualifiedName = function(qualifiedName) {
  if (qualifiedName == null || key == undefined) {
    throw new Error(qualifiedName);
  }
  var result = new Array();
  for (var i = 0; i < this.testFunctions.length; i++) {
    var testFunction = this.testFunctions[i];
    if (qualifiedName == testFunction.getQualifiedName()) {
      result.push(testFunction);
    }
  }
  return result;
};

/**
 * @returns {Object.<string, *>}
 */
sahagin.TestFuncTable.prototype.toYamlObject = function() {
  var result = new Object();
  result['functions'] = sahagin.YamlUtils.toYamlObjectList(this.testFunctions); 
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.TestFuncTable.prototype.fromYamlObject = function(yamlObject) {
  var testFunctionsYamlObj = sahagin.YamlUtils.getYamlObjectListValue(yamlObject, 'functions');
  this.testFunctions = new Array();
  for (var i = 0; i < testFunctionsYamlObj.length; i++) {
    var testFunction = sahagin.TestFunction.newInstanceFromYamlObject(testFunctionsYamlObj[i]);
    this.testFunctions.push(testFunction);
  }
};