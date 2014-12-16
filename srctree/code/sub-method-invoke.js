/**
 * @class
 */
sahagin.SubMethodInvoke = function() {
  sahagin.base(this);

  /**
   * @private
   * @type {sahagin.Code}
   */
  this.thisInstance = null;
};
sahagin.inherits(sahagin.SubMethodInvoke, sahagin.SubFunctionInvoke);

/**
 * @type {string}
 */
sahagin.SubMethodInvoke.TYPE = "method";

/**
 * @returns {string}
 */
sahagin.SubMethodInvoke.prototype.getSubMethodKey = function() {
  return this.getSubFunctionKey();
};

/**
 * @param {string} subMethodKey
 */
sahagin.SubMethodInvoke.prototype.setSubMethodKey = function(subMethodKey) {
  this.setSubFunctionKey(subMethodKey);
};

/**
 * @returns {sahagin.TestMethod}
 */
sahagin.SubMethodInvoke.prototype.getSubMethod = function() {
  return this.getSubFunction();
};

/**
 * @param {sahagin.TestFunction} subFunction
 */
sahagin.SubMethodInvoke.prototype.setSubFunction = function(subFunction) {
  if (!(subFunction instanceof sahagin.TestMethod)) {
    throw new Error('not testMethod: ' + subFunction);
  }
  sahagin.base(this, 'setSubFunction', subFunction);
};

/**
 * @param {sahagin.TestMethod} subMethod
 */
sahagin.SubMethodInvoke.prototype.setSubMethod = function(subMethod) {
  this.setSubFunction(subMethod);
};

/**
 * @returns {string}
 */
sahagin.SubMethodInvoke.prototype.getType = function() {
  return sahagin.SubMethodInvoke.TYPE;
};

/**
 * @returns {string}
 */
sahagin.SubMethodInvoke.prototype.getFunctionKeyName = function() {
  return "methodKey";
};

/**
 * @returns {sahagin.Code}
 */
sahagin.SubMethodInvoke.prototype.getThisInstance = function() {
  return this.thisInstance;
};

/**
 * @param {sahagin.Code} thisInstance
 */
sahagin.SubMethodInvoke.prototype.setThisInstance = function(thisInstance) {
  this.thisInstance = thisInstance;
};

/**
 * @returns {Object.<String, *>}
 */
sahagin.SubMethodInvoke.prototype.toYamlObject = function() {
  var result = sahagin.base(this, 'toYamlObject');
  if (this.thisInstance != null) {
    result['thisInstance'] = this.thisInstance.toYamlObject();
  }
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.SubMethodInvoke.prototype.fromYamlObject = function(yamlObject) {
  sahagin.base(this, 'fromYamlObject', yamlObject);
  var thisInstanceYamlObj = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'thisInstance', true);
  if (thisInstanceYamlObj == null) {
    this.thisInstance = null;
  } else {
    this.thisInstance = sahagin.Code.newInstanceFromYamlObject(thisInstanceYamlObj);
  }
};
