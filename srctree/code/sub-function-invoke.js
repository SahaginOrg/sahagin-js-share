/**
 * @class
 */
sahagin.SubFunctionInvoke = function() {
  sahagin.base(this);

  /**
   * @private
   * @type {string}
   */
  this.subFunctionKey = null;

  /**
   * @private
   * @type {sahagin.TestFunction}
   */
  this.subFunction = null;

  /**
   * @type {Array.<sahagin.Code>}
   */
  this.args = new Array();
};
sahagin.inherits(sahagin.SubFunctionInvoke, sahagin.Code);

/**
 * @type {string}
 */
sahagin.SubFunctionInvoke.TYPE = "function";

/**
 * @returns {string}
 */
sahagin.SubFunctionInvoke.prototype.getSubFunctionKey = function() {
  return this.subFunctionKey;
};

/**
 * @param {string} subFunctionKey
 */
sahagin.SubFunctionInvoke.prototype.setSubFunctionKey = function(subFunctionKey) {
  this.subFunctionKey = subFunctionKey;
};

/**
 * @returns {sahagin.TestFunction}
 */
sahagin.SubFunctionInvoke.prototype.getSubFunction = function() {
  return this.subFunction;
};

/**
 * @param {sahagin.TestFunction}
 */
sahagin.SubFunctionInvoke.prototype.setSubFunction = function(subFunction) {
  this.subFunction = subFunction;
};

/**
 * @returns {Array.<sahagin.Code>}
 */
sahagin.SubFunctionInvoke.prototype.getArgs = function() {
  return this.args;
}

/**
 * @param {sahagin.Code} arg
 */
sahagin.SubFunctionInvoke.prototype.addArg = function(arg) {
  this.args.push(arg);
}

/**
 * @returns {string}
 */
sahagin.SubFunctionInvoke.prototype.getType = function() {
  return sahagin.SubFunctionInvoke.TYPE;
};

/**
 * @returns {string}
 */
sahagin.SubFunctionInvoke.prototype.getFunctionKeyName = function() {
  return "functionKey";
};

/**
 * @returns {Object.<String, *>}
 */
sahagin.SubFunctionInvoke.prototype.toYamlObject = function() {
  var result = sahagin.base(this, 'toYamlObject');
  result[this.getFunctionKeyName()] = this.subFunctionKey;
  result['args'] = sahagin.YamlUtils.toYamlObjectList(this.args);
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.SubFunctionInvoke.prototype.fromYamlObject = function(yamlObject) {
  sahagin.base(this, 'fromYamlObject', yamlObject);
  this.subFunctionKey = sahagin.YamlUtils.getStrValue(yamlObject, this.getFunctionKeyName());
  this.subFunction = null;
  var argsYamlObj = sahagin.YamlUtils.getYamlObjectListValue(yamlObject, 'args');
  this.args = new Array();
  for (var i = 0; i < argsYamlObj.length; i++) {
    var code = sahagin.Code.newInstanceFromYamlObject(argsYamlObj[i]);
    this.args.push(code);
  }
};