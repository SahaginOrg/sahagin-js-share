/**
 * @class
 */
sahagin.SrcTree = function() {
  
  /**
   * @private
   * @type {sahagin.TestClassTable}
   */
  this.rootClassTable = null;

  /**
   * @private
   * @type {sahagin.TestFuncTable}
   */
  this.rootFuncTable = null;

  /**
   * @private
   * @type {sahagin.TestClassTable}
   */
  this.subClassTable = null;

  /**
   * @private
   * @type {sahagin.TestFuncTable}
   */
  this.subFuncTable = null;  
};

/**
 * @private
 * @type {string}
 */
sahagin.SrcTree.MSG_CLASS_NOT_FOUND = 'class not found; key: {0}';

/**
 * @private
 * @type {string}
 */
sahagin.SrcTree.MSG_FUNCTION_NOT_FOUND = 'function not found; key: {0}';

/**
 * @private
 * @type {string}
 */
sahagin.SrcTree.MSG_NOT_METHOD = 'function "{0}" is not a method';

/**
 * @returns {sahagin.TestClassTable}
 */
sahagin.SrcTree.prototype.getRootClassTable = function() {
  return this.rootClassTable;
};

/**
 * @param {sahagin.TestClassTable} rootClassTable
 */
sahagin.SrcTree.prototype.setRootClassTable = function(rootClassTable) {
  this.rootClassTable = rootClassTable;
};

/**
 * @param {sahagin.TestFuncTable} rootFuncTable
 */
sahagin.SrcTree.prototype.setRootFuncTable = function(rootFuncTable) {
  this.rootFuncTable = rootFuncTable;
};

/**
 * @returns {sahagin.TestFuncTable}
 */
sahagin.SrcTree.prototype.getRootFuncTable = function() {
  return this.rootFuncTable;
};

/**
 * @returns {sahagin.TestClassTable}
 */
sahagin.SrcTree.prototype.getSubClassTable = function() {
  return this.subClassTable;
};

/**
 * @param {sahagin.TestClassTable} subClassTable
 */
sahagin.SrcTree.prototype.setSubClassTable = function(subClassTable) {
  this.subClassTable = subClassTable;
};

/**
 * @param {sahagin.TestFuncTable} subFuncTable
 */
sahagin.SrcTree.prototype.setSubFuncTable = function(subFuncTable) {
  this.subFuncTable = subFuncTable;
};

/**
 * @returns {sahagin.TestFuncTable}
 */
sahagin.SrcTree.prototype.getSubFuncTable = function() {
  return this.subFuncTable;
};

/**
 * @returns {Object.<string, *>}
 */
sahagin.SrcTree.prototype.toYamlObject = function() {
  var result = new Object();

  var rootClassTableYamlObj = null;
  if (this.rootClassTable != null) {
    rootClassTableYamlObj = this.rootClassTable.toYamlObject();
  }
  var rootFuncTableYamlObj = null;
  if (this.rootFuncTable != null) {
    rootFuncTableYamlObj = this.rootFuncTable.toYamlObject();
  }
  var subClassTableYamlObj = null;
  if (this.subClassTable != null) {
    subClassTableYamlObj = this.subClassTable.toYamlObject();
  }
  var subFuncTableYamlObj = null;
  if (this.subFuncTable != null) {
    subFuncTableYamlObj = this.subFuncTable.toYamlObject();
  }

  result['rootClassTable'] = rootClassTableYamlObj;
  result['rootFuncTable'] = rootFuncTableYamlObj;
  result['subClassTable'] = subClassTableYamlObj;
  result['subFuncTable'] = subFuncTableYamlObj;

  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.SrcTree.prototype.fromYamlObject = function(yamlObject) {
  this.rootClassTable = null;
  this.rootFuncTable = null;
  this.subClassTable = null;
  this.subFuncTable = null;

  var rootClassTableYamlObj = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'rootClassTable');
  if (rootClassTableYamlObj != null) {
    this.rootClassTable = new sahagin.TestClassTable();
    this.rootClassTable.fromYamlObject(rootClassTableYamlObj);
  }
  var rootFuncTableYamlObj = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'rootFuncTable');
  if (rootFuncTableYamlObj != null) {
    this.rootFuncTable = new sahagin.TestFuncTable();
    this.rootFuncTable.fromYamlObject(rootFuncTableYamlObj);
  }
  var subClassTableYamlObj = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'subClassTable');
  if (subClassTableYamlObj != null) {
    this.subClassTable = new sahagin.TestClassTable();
    this.subClassTable.fromYamlObject(subClassTableYamlObj);
  }
  var subFuncTableYamlObj = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'subFuncTable');
  if (subFuncTableYamlObj != null) {
    this.subFuncTable = new sahagin.TestFuncTable();
    this.subFuncTable.fromYamlObject(subFuncTableYamlObj);
  }
};

/**
 * @param {string} testClassKey
 * @return {sahagin.TestClass}
 */
sahagin.SrcTree.prototype.getTestClassByKey = function(testClassKey) {
  if (this.subClassTable != null) {
    var subClass = this.subClassTable.getByKey(testClassKey);
    if (subClass != null) {
      return subClass;
    }
  }
  if (this.rootClassTable != null) {
    var rootClass = this.rootClassTable.getByKey(testClassKey);
    if (rootClass != null) {
      return rootClass;
    }
  }
  throw new Error(sahagin.CommonUtils.strFormat(
      sahagin.SrcTree.MSG_CLASS_NOT_FOUND, testClassKey));
};

/**
 * @param {string} testFunctionKey
 * @return {sahagin.TestFunction}
 */
sahagin.SrcTree.prototype.getTestFunctionByKey = function(testFunctionKey) {
  if (this.subFuncTable != null) {
    var subFunc = this.subFuncTable.getByKey(testFunctionKey);
    if (subFunc != null) {
      return subFunc;
    }
  }
  if (this.rootFuncTable != null) {
    var rootFunc = this.rootFuncTable.getByKey(testFunctionKey);
    if (rootFunc != null) {
      return rootFunc;
    }
  }
  throw new Error(sahagin.CommonUtils.strFormat(
      sahagin.SrcTree.MSG_FUNCTION_NOT_FOUND, testFunctionKey));
};

/**
 * @param {string} testMethodKey
 * @return {sahagin.TestMethod}
 */
sahagin.SrcTree.prototype.getTestMethodByKey = function(testMethodKey) {
  var testFunction = this.getTestFunctionByKey(testMethodKey);

  if (!(testFunction instanceof sahagin.TestMethod)) {
    throw new Error(sahagin.CommonUtils.strFormat(
        sahagin.SrcTree.MSG_NOT_METHOD, testFunction.getQualifiedName()));
  }
  return testFunction;
};

/**
 * @param {sahagin.TestFunction} testFunction
 */
sahagin.SrcTree.prototype.resolveTestClass = function(testFunction) {
  if (!(testFunction instanceof sahagin.TestMethod)) {
    return;
  }
  
  var testMethod = testFunction;
  testMethod.setTestClass(this.getTestClassByKey(testMethod.getTestClassKey()));        
};

/**
 * @param {sahagin.TestClass} testClass
 */
sahagin.SrcTree.prototype.resolveTestMethod = function(testClass) {
  testClass.clearTestMethods();
  for (var i = 0; i < testClass.getTestMethodKeys().length; i++) {
    var testMethod = this.getTestMethodByKey(testClass.getTestMethodKeys()[i]);
    testClass.addTestMethod(testMethod);
  }
};

/**
 * @param {sahagin.Code} code
 */
sahagin.SrcTree.prototype.resolveTestFunction = function(code) {
  // TODO recursive resolve is required for method arguments
  
  if (code == null || code == undefined) {
    return;
  }
  
  if (code instanceof sahagin.SubMethodInvoke) {
    var invoke = code;
    var testMethod = this.getTestMethodByKey(invoke.getSubMethodKey());
    invoke.setSubMethod(testMethod);
    for (var i = 0; i < invoke.getArgs().length; i++) {
      this.resolveTestFunction(invoke.getArgs()[i]);
    }
  } else if (code instanceof sahagin.SubFunctionInvoke) {
    var invoke = code;
    var testFunction = this.getTestFunctionByKey(invoke.getSubFunctionKey());
    invoke.setSubFunction(testFunction);
    for (var i = 0; i < invoke.getArgs().length; i++) {
      this.resolveTestFunction(invoke.getArgs()[i]);
    }
  }
};

/**
 * resolve all methodKey and classKey references.
 * assume all keys have been set.
 */
sahagin.SrcTree.prototype.resolveKeyReference = function() {
  if (this.rootClassTable != null) {
    for (var i = 0; i < this.rootClassTable.getTestClasses().length; i++) {
      this.resolveTestMethod(this.rootClassTable.getTestClasses()[i]);
    }
  }
  if (this.subClassTable != null) {
    for (var i = 0; i < this.subClassTable.getTestClasses().length; i++) {
      this.resolveTestMethod(this.subClassTable.getTestClasses()[i]);
    }
  }
  if (this.rootFuncTable != null) {
    for (var i = 0; i < this.rootFuncTable.getTestFunctions().length; i++) {
      var testFunction = this.rootFuncTable.getTestFunctions()[i];
      this.resolveTestClass(testFunction);
      for (var j = 0; j < testFunction.getCodeBody().length; j++) {
        this.resolveTestFunction(testFunction.getCodeBody()[j].getCode());
      }
    }
  }
  if (this.subFuncTable != null) {
    for (var i = 0; i < this.subFuncTable.getTestFunctions().length; i++) {
      var testFunction = this.subFuncTable.getTestFunctions()[i];
      this.resolveTestClass(testFunction);
      for (var j = 0; j < testFunction.getCodeBody().length; j++) {
        this.resolveTestFunction(testFunction.getCodeBody()[j].getCode());
      }
    }
  }
};