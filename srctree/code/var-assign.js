/**
 * @class
 */
sahagin.VarAssign = function() {
  sahagin.base(this);

  /**
   * @private
   * @type {sahagin.Code}
   */
  this.variable = null;

  /**
   * @private
   * @type {sahagin.Code}
   */
  this.value = null;
};
sahagin.inherits(sahagin.VarAssign, sahagin.Code);

/**
 * @type {string}
 */
sahagin.VarAssign.TYPE = "varAssign";

/**
 * @returns {string}
 */
sahagin.VarAssign.prototype.getType = function() {
  return sahagin.VarAssign.TYPE;
};

/**
 * @returns {sahagin.Code}
 */
sahagin.VarAssign.prototype.getVariable = function() {
  return this.variable;
};

/**
 * @param {sahagin.Code} variable
 */
sahagin.VarAssign.prototype.setVariable = function(variable) {
  this.variable = variable;
};

/**
 * @returns {sahagin.Code}
 */
sahagin.VarAssign.prototype.getValue = function() {
  return this.value;
};

/**
 * @param {sahagin.Code} value
 */
sahagin.VarAssign.prototype.setValue = function(value) {
  this.value = value;
};

/**
 * @returns {Object.<String, *>}
 */
sahagin.VarAssign.prototype.toYamlObject = function() {
  var result = sahagin.base(this, 'toYamlObject');
  result['var'] = sahagin.YamlUtils.toYamlObject(this.variable);
  result['value'] = sahagin.YamlUtils.toYamlObject(this.value);
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.VarAssign.prototype.fromYamlObject = function(yamlObject) {
  sahagin.base(this, 'fromYamlObject', yamlObject);
  var variableYamlObj = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'var');
  this.variable = sahagin.Code.newInstanceFromYamlObject(variableYamlObj);
  var valueYamlObj = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'value');
  this.value = sahagin.Code.newInstanceFromYamlObject(valueYamlObj);
};