/**
 * @class
 */
sahagin.SubMethodInvoke = function() {
  sahagin.base(this);

  /**
   * @private
   * @type {string}
   */
  this.subMethodKey = null;

  /**
   * @private
   * @type {sahagin.TestMethod}
   */
  this.subMethod = null;

  /**
   * @type {Array.<sahagin.Code>}
   */
  this.args = new Array();

  /**
   * @private
   * @type {sahagin.Code}
   */
  this.thisInstance = null;
};
sahagin.inherits(sahagin.SubMethodInvoke, sahagin.Code);

/**
 * @type {string}
 */
sahagin.SubMethodInvoke.TYPE = "method";

/**
 * @returns {string}
 */
sahagin.SubMethodInvoke.prototype.getSubMethodKey = function() {
  return this.subMethodKey;
};

/**
 * @param {string} subMethodKey
 */
sahagin.SubMethodInvoke.prototype.setSubMethodKey = function(subMethodKey) {
  this.subMethodKey = subMethodKey;
};

/**
 * @returns {sahagin.TestMethod}
 */
sahagin.SubMethodInvoke.prototype.getSubMethod = function() {
  return this.subMethod;
};

/**
 * @param {sahagin.TestMethod} subMethod
 */
sahagin.SubMethodInvoke.prototype.setSubMethod = function(subMethod) {
  this.subMethod = subMethod;
};

/**
 * @returns {Array.<sahagin.Code>}
 */
sahagin.SubMethodInvoke.prototype.getArgs = function() {
  return this.args;
}

/**
 * @param {sahagin.Code} arg
 */
sahagin.SubMethodInvoke.prototype.addArg = function(arg) {
  this.args.push(arg);
}

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
 * @returns {string}
 */
sahagin.SubMethodInvoke.prototype.getType = function() {
  return sahagin.SubMethodInvoke.TYPE;
};

/**
 * @returns {Object.<String, *>}
 */
sahagin.SubMethodInvoke.prototype.toYamlObject = function() {
  var result = sahagin.base(this, 'toYamlObject');
  result['methodKey'] = this.subMethodKey;
  result['args'] = sahagin.YamlUtils.toYamlObjectList(this.args);
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
  this.subMethodKey = sahagin.YamlUtils.getStrValue(yamlObject, 'methodKey');
  this.subMethod = null;
  var argsYamlObj = sahagin.YamlUtils.getYamlObjectListValue(yamlObject, 'args');
  this.args = new Array();
  for (var i = 0; i < argsYamlObj.length; i++) {
    var code = sahagin.Code.newInstanceFromYamlObject(argsYamlObj[i]);
    this.args.push(code);
  }
  var thisInstanceYamlObj = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'thisInstance', true);
  if (thisInstanceYamlObj == null) {
    this.thisInstance = null;
  } else {
    this.thisInstance = sahagin.Code.newInstanceFromYamlObject(thisInstanceYamlObj);
  }
};