/**
 * @class
 */
sahagin.LocalVar = function() {
  sahagin.base(this);

  /**
   * @private
   * @type {string}
   */
  this.name = null;
};
sahagin.inherits(sahagin.LocalVar, sahagin.Code);

/**
 * @type {string}
 */
sahagin.LocalVar.TYPE = "localVar";

/**
 * @returns {string}
 */
sahagin.LocalVar.prototype.getType = function() {
  return sahagin.LocalVar.TYPE;
};

/**
 * @returns {string}
 */
sahagin.LocalVar.prototype.getName = function() {
  return this.name;
};

/**
 * @param {string} name
 */
sahagin.LocalVar.prototype.setName = function(name) {
  this.name = name;
};

/**
 * @returns {Object.<String, *>}
 */
sahagin.LocalVar.prototype.toYamlObject = function() {
  var result = sahagin.base(this, 'toYamlObject');
  result['name'] = this.name;
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.LocalVar.prototype.fromYamlObject = function(yamlObject) {
  sahagin.base(this, 'fromYamlObject', yamlObject);
  this.name = sahagin.YamlUtils.getStrValue(yamlObject, 'name');
};