/**
 * @class
 */
sahagin.FuncArgument = function() {
  sahagin.base(this);

  /**
   * @private
   * @type {number}
   */
  this.argIndex = -1;
};
sahagin.inherits(sahagin.FuncArgument, sahagin.Code);

/**
 * @type {string}
 */
sahagin.FuncArgument.TYPE = "arg";

/**
 * @returns {string}
 */
sahagin.FuncArgument.prototype.getType = function() {
  return sahagin.FuncArgument.TYPE;
};

/**
 * @returns {number}
 */
sahagin.FuncArgument.prototype.getArgIndex = function() {
  return this.argIndex;
};

/**
 * @param {number} argIndex
 */
sahagin.FuncArgument.prototype.setArgIndex = function(argIndex) {
    this.argIndex = argIndex;
};

/**
 * @returns {Object.<String, *>}
 */
sahagin.FuncArgument.prototype.toYamlObject = function() {
  var result = sahagin.base(this, 'toYamlObject');
  result['argIndex'] = this.argIndex;
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.FuncArgument.prototype.fromYamlObject = function(yamlObject) {
  sahagin.base(this, 'fromYamlObject', yamlObject);
  this.argIndex = sahagin.YamlUtils.getStrValue(yamlObject, 'argIndex');
};
