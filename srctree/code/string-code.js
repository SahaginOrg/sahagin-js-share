/**
 * @class
 */
sahagin.StringCode = function() {
  sahagin.base(this);

  /**
   * @private
   * @type {string}
   */
  this.value = null;
};
sahagin.inherits(sahagin.StringCode, sahagin.Code);

/**
 * @type {string}
 */
sahagin.StringCode.TYPE = "string";

/**
 * @returns {string}
 */
sahagin.StringCode.prototype.getValue = function() {
  return this.value;
};

/**
 * @param {string} value
 */
sahagin.StringCode.prototype.setValue = function(value) {
  this.value = value;
};

/**
 * @returns {string}
 */
sahagin.StringCode.prototype.getType = function() {
  return sahagin.StringCode.TYPE;
};

/**
 * @returns {Object.<String, *>}
 */
sahagin.StringCode.prototype.toYamlObject = function() {
  var result = sahagin.base(this, 'toYamlObject');
  result['value'] = this.value;
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.StringCode.prototype.fromYamlObject = function(yamlObject) {
  sahagin.base(this, 'fromYamlObject', yamlObject);
  this.value = sahagin.YamlUtils.getStrValue(yamlObject, 'value');
};
