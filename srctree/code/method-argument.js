/**
 * @class
 */
sahagin.MethodArgument = function() {
  sahagin.base(this);

  /**
   * @private
   * @type {number}
   */
  this.argIndex = -1;
};
sahagin.inherits(sahagin.MethodArgument, sahagin.Code);

/**
 * @type {string}
 */
sahagin.MethodArgument.TYPE = "arg";

/**
 * @returns {string}
 */
sahagin.MethodArgument.prototype.getType = function() {
  return sahagin.MethodArgument.TYPE;
};

/**
 * @returns {number}
 */
sahagin.MethodArgument.prototype.getArgIndex = function() {
  return this.argIndex;
};

/**
 * @param {number} argIndex
 */
sahagin.MethodArgument.prototype.setArgIndex = function(argIndex) {
    this.argIndex = argIndex;
};

/**
 * @returns {Object.<String, *>}
 */
sahagin.MethodArgument.prototype.toYamlObject = function() {
  var result = sahagin.base(this, 'toYamlObject');
  result['argIndex'] = this.argIndex;
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.MethodArgument.prototype.fromYamlObject = function(yamlObject) {
  sahagin.base(this, 'fromYamlObject', yamlObject);
  this.argIndex = sahagin.YamlUtils.getStrValue(yamlObject, 'argIndex');
};
