/**
 * @class
 */
sahagin.LocalVarAssign = function() {
  sahagin.base(this);

  /**
   * @private
   * @type {string}
   */
  this.name = null;

  /**
   * @private
   * @type {sahagin.Code}
   */
  this.value = null;
};
sahagin.inherits(sahagin.LocalVarAssign, sahagin.Code);

/**
 * @type {string}
 */
sahagin.LocalVarAssign.TYPE = "localVarAssign";

/**
 * @returns {string}
 */
sahagin.LocalVarAssign.prototype.getType = function() {
  return sahagin.LocalVarAssign.TYPE;
};

/**
 * @returns {string}
 */
sahagin.LocalVarAssign.prototype.getName = function() {
  return this.name;
};

/**
 * @param {string} name
 */
sahagin.LocalVarAssign.prototype.setName = function(name) {
  this.name = name;
};

/**
 * @returns {sahagin.Code}
 */
sahagin.LocalVarAssign.prototype.getValue = function() {
  return this.value;
};

/**
 * @param {sahagin.Code} value
 */
sahagin.LocalVarAssign.prototype.setValue = function(value) {
  this.value = value;
};


/**
 * @returns {Object.<String, *>}
 */
sahagin.LocalVarAssign.prototype.toYamlObject = function() {
  var result = sahagin.base(this, 'toYamlObject');
  result['name'] = this.name;
  if (this.value === null) {
    result['value'] = null;
  } else {
    result['value'] = this.value.toYamlObject();
  }
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.LocalVarAssign.prototype.fromYamlObject = function(yamlObject) {
  sahagin.base(this, 'fromYamlObject', yamlObject);
  this.name = sahagin.YamlUtils.getStrValue(yamlObject, 'name');
  var valueYamlObj = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'value');
  if (valueYamlObj == null) {
    this.value = null;
  } else {
    this.value = sahagin.Code.newInstanceFromYamlObject(valueYamlObj);
  }
};