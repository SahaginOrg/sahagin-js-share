/**
 * @class
 */
sahagin.Code = function() {

  /**
   * @private
   * @type {string}
   */
  this.original = null;
};

/**
 * @private
 */
sahagin.MSG_INVALID_TYPE = 'invalid type: {0}';

/**
 * @returns {string}
 */
sahagin.Code.prototype.getOriginal = function() {
  return this.original;	
};

/**
 * @param {string} original
 */
sahagin.Code.prototype.setOriginal = function(original) {
  this.original = original;
};

/**
 * @abstract
 * @returns {string}
 */
sahagin.Code.prototype.getType = function() {
  throw new Error('this method must be overridden');
};

/**
 * @returns {Object.<String, *>}
 */
sahagin.Code.prototype.toYamlObject = function() {
  var result = new Object();
  result['type'] = this.getType();
  result['original'] = this.original;
  return result;
};

/**
 * @param {Object.<String, *>} yamlObject
 */
sahagin.Code.prototype.fromYamlObject = function(yamlObject) {
  sahagin.YamlUtils.strValueEqualsCheck(yamlObject, 'type', this.getType());
  this.original = sahagin.YamlUtils.getStrValue(yamlObject, 'original');
};

/**
 * @param {Object.<String, *>} yamlObject
 * @returns {sahagin.Code}
 */
sahagin.Code.newInstanceFromYamlObject = function(yamlObject) {
  var type = sahagin.YamlUtils.getStrValue(yamlObject, 'type');
  var result;
  if (type == sahagin.StringCode.TYPE) {
    result = new sahagin.StringCode();
  } else if (type == sahagin.SubFunctionInvoke.TYPE) {
    result = new sahagin.SubFunctionInvoke();
  } else if (type == sahagin.SubMethodInvoke.TYPE) {
    result = new sahagin.SubMethodInvoke();
  } else if (type == sahagin.UnknownCode.TYPE) {
    result = new sahagin.UnknownCode();
  } else {    
    throw new Error(sahagin.CommonUtils.strFormat(
        sahagin.YamlUtils.MSG_INVALID_TYPE, type));
  }
  result.fromYamlObject(yamlObject);
  return result;
};