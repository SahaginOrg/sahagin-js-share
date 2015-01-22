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
   * @type {sahagin.TestMethodTable}
   */
  this.rootMethodTable = null;

  /**
   * @private
   * @type {sahagin.TestClassTable}
   */
  this.subClassTable = null;

  /**
   * @private
   * @type {sahagin.TestMethodTable}
   */
  this.subMethodTable = null;
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
sahagin.SrcTree.MSG_METHOD_NOT_FOUND = 'method not found; key: {0}';

/**
 * @private
 * @type {string}
 */
sahagin.SrcTree.MSG_SRC_TREE_FORMAT_MISMATCH
= 'expected formatVersion is "{0}", but actual is "{1}"';

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
 * @param {sahagin.TestMethodTable} rootMethodTable
 */
sahagin.SrcTree.prototype.setRootMethodTable = function(rootMethodTable) {
  this.rootMethodTable = rootMethodTable;
};

/**
 * @returns {sahagin.TestMethodTable}
 */
sahagin.SrcTree.prototype.getRootMethodTable = function() {
  return this.rootMethodTable;
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
 * @param {sahagin.TestMethodTable} subMethodTable
 */
sahagin.SrcTree.prototype.setSubMethodTable = function(subMethodTable) {
  this.subMethodTable = subMethodTable;
};

/**
 * @returns {sahagin.TestMethodTable}
 */
sahagin.SrcTree.prototype.getSubMethodTable = function() {
  return this.subMethodTable;
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
  var rootMethodTableYamlObj = null;
  if (this.rootMethodTable != null) {
    rootMethodTableYamlObj = this.rootMethodTable.toYamlObject();
  }
  var subClassTableYamlObj = null;
  if (this.subClassTable != null) {
    subClassTableYamlObj = this.subClassTable.toYamlObject();
  }
  var subMethodTableYamlObj = null;
  if (this.subMethodTable != null) {
    subMethodTableYamlObj = this.subMethodTable.toYamlObject();
  }

  result['rootClassTable'] = rootClassTableYamlObj;
  result['rootMethodTable'] = rootMethodTableYamlObj;
  result['subClassTable'] = subClassTableYamlObj;
  result['subMethodTable'] = subMethodTableYamlObj;
  result['formatVersion'] = sahagin.CommonUtils.formatVersion();

  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.SrcTree.prototype.fromYamlObject = function(yamlObject) {
  var formatVersion = sahagin.YamlUtils.getStrValue(yamlObject, 'formatVersion');
  // "*" means arbitrary version (this is only for testing sahagin itself)
  if ((formatVersion != '*')
      && (formatVersion != sahagin.CommonUtils.formatVersion())) {
    throw new Error(sahagin.CommonUtils.strFormat(
        sahagin.SrcTree.MSG_SRC_TREE_FORMAT_MISMATCH,
        sahagin.CommonUtils.formatVersion(), formatVersion));
  }

  this.rootClassTable = null;
  this.rootMethodTable = null;
  this.subClassTable = null;
  this.subMethodTable = null;

  var rootClassTableYamlObj = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'rootClassTable');
  if (rootClassTableYamlObj != null) {
    this.rootClassTable = new sahagin.TestClassTable();
    this.rootClassTable.fromYamlObject(rootClassTableYamlObj);
  }
  var rootMethodTableYamlObj = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'rootMethodTable');
  if (rootMethodTableYamlObj != null) {
    this.rootMethodTable = new sahagin.TestMethodTable();
    this.rootMethodTable.fromYamlObject(rootMethodTableYamlObj);
  }
  var subClassTableYamlObj = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'subClassTable');
  if (subClassTableYamlObj != null) {
    this.subClassTable = new sahagin.TestClassTable();
    this.subClassTable.fromYamlObject(subClassTableYamlObj);
  }
  var subMethodTableYamlObj = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'subMethodTable');
  if (subMethodTableYamlObj != null) {
    this.subMethodTable = new sahagin.TestMethodTable();
    this.subMethodTable.fromYamlObject(subMethodTableYamlObj);
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
 * @param {string} testMethodKey
 * @return {sahagin.TestMethod}
 */
sahagin.SrcTree.prototype.getTestMethodByKey = function(testMethodKey) {
  if (this.subMethodTable != null) {
    var subMethod = this.subMethodTable.getByKey(testMethodKey);
    if (subMethod != null) {
      return subMethod;
    }
  }
  if (this.rootMethodTable != null) {
    var rootMethod = this.rootMethodTable.getByKey(testMethodKey);
    if (rootMethod != null) {
      return rootMethod;
    }
  }
  throw new Error(sahagin.CommonUtils.strFormat(
      sahagin.SrcTree.MSG_METHOD_NOT_FOUND, testMethodKey));
};

/**
 * @param {sahagin.TestMethod} testMethod
 */
sahagin.SrcTree.prototype.resolveTestClass = function(testMethod) {
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
sahagin.SrcTree.prototype.resolveTestMethod = function(code) {
  if (code == null || code == undefined) {
    return;
  }

  if (code instanceof sahagin.SubMethodInvoke) {
    var invoke = code;
    var testMethod = this.getTestMethodByKey(invoke.getSubMethodKey());
    invoke.setSubMethod(testMethod);
    this.resolveTestMethod(invoke.getThisInstance());
    for (var i = 0; i < invoke.getArgs().length; i++) {
      this.resolveTestMethod(invoke.getArgs()[i]);
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
  if (this.rootMethodTable != null) {
    for (var i = 0; i < this.rootMethodTable.getTestMethods().length; i++) {
      var testMethod = this.rootMethodTable.getTestMethods()[i];
      this.resolveTestClass(testMethod);
      for (var j = 0; j < testMethod.getCodeBody().length; j++) {
        this.resolveTestMethod(testMethod.getCodeBody()[j].getCode());
      }
    }
  }
  if (this.subMethodTable != null) {
    for (var i = 0; i < this.subMethodTable.getTestMethods().length; i++) {
      var testMethod = this.subMethodTable.getTestMethods()[i];
      this.resolveTestClass(testMethod);
      for (var j = 0; j < testMethod.getCodeBody().length; j++) {
        this.resolveTestMethod(testMethod.getCodeBody()[j].getCode());
      }
    }
  }
};