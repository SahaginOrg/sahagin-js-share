/**
 * @class
 */
sahagin.SrcTree = function() {

  /**
   * @private
   * @type {sahagin.TestClassTable}
   */
  this.rootClassTable = new sahagin.TestClassTable();

  /**
   * @private
   * @type {sahagin.TestMethodTable}
   */
  this.rootMethodTable = new sahagin.TestMethodTable();

  /**
   * @private
   * @type {sahagin.TestClassTable}
   */
  this.subClassTable = new sahagin.TestClassTable();

  /**
   * @private
   * @type {sahagin.TestMethodTable}
   */
  this.subMethodTable = new sahagin.TestMethodTable();

  /**
   * @private
   * @type {sahagin.TestFieldTable}
   */
  this.fieldTable = new sahagin.TestFieldTable();
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
sahagin.SrcTree.MSG_FIELD_NOT_FOUND = 'field not found; key: {0}';

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
  if (rootClassTable == null) {
    throw new Error("null argument");
  }
  this.rootClassTable = rootClassTable;
};

/**
 * @returns {sahagin.TestMethodTable}
 */
sahagin.SrcTree.prototype.getRootMethodTable = function() {
  return this.rootMethodTable;
};

/**
 * @param {sahagin.TestMethodTable} rootMethodTable
 */
sahagin.SrcTree.prototype.setRootMethodTable = function(rootMethodTable) {
  if (rootMethodTable == null) {
    throw new Error("null argument");
  }
  this.rootMethodTable = rootMethodTable;
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
  if (subClassTable == null) {
    throw new Error("null argument");
  }
  this.subClassTable = subClassTable;
};

/**
 * @returns {sahagin.TestMethodTable}
 */
sahagin.SrcTree.prototype.getSubMethodTable = function() {
  return this.subMethodTable;
};

/**
 * @param {sahagin.TestMethodTable} subMethodTable
 */
sahagin.SrcTree.prototype.setSubMethodTable = function(subMethodTable) {
  if (subMethodTable == null) {
    throw new Error("null argument");
  }
  this.subMethodTable = subMethodTable;
};

/**
 * @returns {sahagin.TestFieldTable}
 */
sahagin.SrcTree.prototype.getFieldTable = function() {
  return this.fieldTable;
};

/**
 *
 */
sahagin.SrcTree.prototype.setFieldTable = function(fieldTable) {
  if (fieldTable == null) {
    throw new Error("null argument");
  }
  this.fieldTable = fieldTable;
};

/**
 * @returns {Object.<string, *>}
 */
sahagin.SrcTree.prototype.toYamlObject = function() {
  var result = new Object();
  result['formatVersion'] = sahagin.CommonUtils.formatVersion();

  if (!this.fieldTable.isEmpty()) {
    result['fieldTable'] =  this.fieldTable.toYamlObject();
  }
  if (!this.rootClassTable.isEmpty()) {
    result['rootClassTable'] = this.rootClassTable.toYamlObject();
  }
  if (!this.rootMethodTable.isEmpty()) {
    result['rootMethodTable'] = this.rootMethodTable.toYamlObject();
  }
  if (!this.subClassTable.isEmpty()) {
    result['subClassTable'] = this.subClassTable.toYamlObject();
  }
  if (!this.subMethodTable.isEmpty()) {
    result['subMethodTable'] = this.subMethodTable.toYamlObject();
  }
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

  this.fieldTable = new sahagin.TestFieldTable();
  var fieldTableYamlObj
  = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'fieldTable', true);
  if (fieldTableYamlObj != null) {
    this.fieldTable.fromYamlObject(fieldTableYamlObj);
  }

  this.rootMethodTable = new sahagin.TestMethodTable();
  var rootMethodTableYamlObj
  = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'rootMethodTable', true);
  if (rootMethodTableYamlObj != null) {
    this.rootMethodTable.fromYamlObject(rootMethodTableYamlObj);
  }

  this.subMethodTable = new sahagin.TestMethodTable();
  var subMethodTableYamlObj
  = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'subMethodTable', true);
  if (subMethodTableYamlObj != null) {
    this.subMethodTable.fromYamlObject(subMethodTableYamlObj);
  }

  this.rootClassTable = new sahagin.TestClassTable();
  var rootClassTableYamlObj
  = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'rootClassTable', true);
  if (rootClassTableYamlObj != null) {
    this.rootClassTable.fromYamlObject(rootClassTableYamlObj);
  }

  this.subClassTable = new sahagin.TestClassTable();
  var subClassTableYamlObj
  = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'subClassTable', true);
  if (subClassTableYamlObj != null) {
    this.subClassTable.fromYamlObject(subClassTableYamlObj);
  }
};

/**
 * @param {string} testClassKey
 * @returns {sahagin.TestClass}
 */
sahagin.SrcTree.prototype.getTestClassByKey = function(testClassKey) {
  var subClass = this.subClassTable.getByKey(testClassKey);
  if (subClass != null) {
    return subClass;
  }
  var rootClass = this.rootClassTable.getByKey(testClassKey);
  if (rootClass != null) {
    return rootClass;
  }
  throw new Error(sahagin.CommonUtils.strFormat(
      sahagin.SrcTree.MSG_CLASS_NOT_FOUND, testClassKey));
};

/**
 * @param {string} testMethodKey
 * @returns {sahagin.TestMethod}
 */
sahagin.SrcTree.prototype.getTestMethodByKey = function(testMethodKey) {
  var subMethod = this.subMethodTable.getByKey(testMethodKey);
  if (subMethod != null) {
    return subMethod;
  }
  var rootMethod = this.rootMethodTable.getByKey(testMethodKey);
  if (rootMethod != null) {
    return rootMethod;
  }
  throw new Error(sahagin.CommonUtils.strFormat(
      sahagin.SrcTree.MSG_METHOD_NOT_FOUND, testMethodKey));
};

/**
 * @param {string} testFieldKey
 * @returns {sahagin.TestField}
 */
sahagin.SrcTree.prototype.getTestFieldByKey = function(testFieldKey) {
  var field = this.fieldTable.getByKey(testFieldKey);
  if (field != null) {
    return field;
  }
  throw new Error(sahagin.CommonUtils.strFormat(
      sahagin.SrcTree.MSG_FIELD_NOT_FOUND, testFieldKey));
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
sahagin.SrcTree.prototype.resolveTestMethodInTestClass = function(testClass) {
  testClass.clearTestMethods();
  for (var i = 0; i < testClass.getTestMethodKeys().length; i++) {
    var testMethod = this.getTestMethodByKey(testClass.getTestMethodKeys()[i]);
    testClass.addTestMethod(testMethod);
  }
};

/**
 * @param {sahagin.TestClass} testClass
 */
sahagin.SrcTree.prototype.resolveTestField = function(testClass) {
  testClass.clearTestFields();
  for (var i = 0; i < testClass.getTestFieldKeys().length; i++) {
    var testField = this.getTestFieldByKey(testClass.getTestFieldKeys()[i]);
    testClass.addTestField(testField);
  }
};

/**
 * @param {sahagin.TestClass} testClass
 */
sahagin.SrcTree.prototype.resolveDelegateToTestClass = function(testClass) {
  if (testClass.getDelegateToTestClassKey() === null) {
    testClass.setDelegateToTestClass(null);
  } else {
    testClass.setDelegateToTestClass(
        this.getTestClassByKey(testClass.getDelegateToTestClassKey()));
  }
};

/**
 * @param {sahagin.Code} code
 */
sahagin.SrcTree.prototype.resolveTestMethodInCode = function(code) {
  if (code == null || code == undefined) {
    return;
  }

  if (code instanceof sahagin.SubMethodInvoke) {
    var invoke = code;
    var testMethod = this.getTestMethodByKey(invoke.getSubMethodKey());
    invoke.setSubMethod(testMethod);
    this.resolveTestMethodInCode(invoke.getThisInstance());
    for (var i = 0; i < invoke.getArgs().length; i++) {
      this.resolveTestMethodInCode(invoke.getArgs()[i]);
    }
  } else if (code instanceof sahagin.VarAssign) {
    var assign = code;
    this.resolveTestMethodInCode(assign.getVariable());
    this.resolveTestMethodInCode(assign.getValue());
  } else if (code instanceof sahagin.TestStep) {
    var testStep = code;
    for (var i = 0; i < testStep.getStepBody().length; i++) {
      this.resolveTestMethodInCode(testStep.getStepBody()[i].getCode());
    }
  }
};

/**
 * resolve all methodKey and classKey references.
 * assume all keys have been set.
 */
sahagin.SrcTree.prototype.resolveKeyReference = function() {
  for (var i = 0; i < this.rootClassTable.getTestClasses().length; i++) {
    var testClass = this.rootClassTable.getTestClasses()[i];
    this.resolveTestMethodInTestClass(testClass);
    this.resolveTestField(testClass);
    this.resolveDelegateToTestClass(testClass);
  }
  for (var i = 0; i < this.subClassTable.getTestClasses().length; i++) {
    var testClass = this.subClassTable.getTestClasses()[i];
    this.resolveTestMethodInTestClass(testClass);
    this.resolveTestField(testClass);
    this.resolveDelegateToTestClass(testClass);
  }
  for (var i = 0; i < this.rootMethodTable.getTestMethods().length; i++) {
    var testMethod = this.rootMethodTable.getTestMethods()[i];
    this.resolveTestClass(testMethod);
    for (var j = 0; j < testMethod.getCodeBody().length; j++) {
      this.resolveTestMethodInCode(testMethod.getCodeBody()[j].getCode());
    }
  }
  for (var i = 0; i < this.subMethodTable.getTestMethods().length; i++) {
    var testMethod = this.subMethodTable.getTestMethods()[i];
    this.resolveTestClass(testMethod);
    for (var j = 0; j < testMethod.getCodeBody().length; j++) {
      this.resolveTestMethodInCode(testMethod.getCodeBody()[j].getCode());
    }
  }
};