/**
 * @class
 */
sahagin.Field = function() {
  sahagin.base(this);

  /**
   * @private
   * @type {string}
   */
  this.fieldKey = null;

  /**
   * @private
   * @type {sahagin.Field}
   */
  this.field = null;

  /**
   * @private
   * @type {sahagin.Code}
   */
  this.thisInstance = null;
};
sahagin.inherits(sahagin.Field, sahagin.Code);

/**
 * @type {string}
 */
sahagin.Field.TYPE = "field";

/**
 * @returns {string}
 */
sahagin.Field.prototype.getFieldKey = function() {
  return this.fieldKey;
};

/**
 * @param {string} fieldKey
 */
sahagin.Field.prototype.setFieldKey = function(fieldKey) {
  this.fieldKey = fieldKey;
};

/**
 * @returns {sahagin.TestField}
 */
sahagin.Field.prototype.getField = function() {
  return this.field;
};

/**
 * @param {sahagin.TestField} field
 */
sahagin.Field.prototype.setField = function(field) {
  this.field = field;
};

/**
 * @returns {sahagin.Code}
 */
sahagin.Field.prototype.getThisInstance = function() {
  return thisInstance;
};

/**
 * @param {sahagin.Code} thisInstance
 */
sahagin.Field.prototype.setThisInstance = function(thisInstance) {
  this.thisInstance = thisInstance;
};

/**
 * @returns {string}
 */
sahagin.Field.prototype.getType = function() {
  return sahagin.Field.TYPE;
};

/**
 * @returns {Object.<String, *>}
 */
sahagin.Field.prototype.toYamlObject = function() {
  var result = sahagin.base(this, 'toYamlObject');
  result['fieldKey'] = this.fieldKey;
  if (this.thisInstance != null) {
    result['thisInstance'] = sahagin.YamlUtils.toYamlObject(this.thisInstance);
  }
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.Field.prototype.fromYamlObject = function(yamlObject) {
  sahagin.base(this, 'fromYamlObject', yamlObject);
  this.fieldKey = sahagin.YamlUtils.getStrValue(yamlObject, 'fieldKey');
  this.field = null;
  var thisInstanceYamlObj = sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'thisInstance', true);
  this.thisInstance = sahagin.Code.newInstanceFromYamlObject(thisInstanceYamlObj);
};