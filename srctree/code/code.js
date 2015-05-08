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
sahagin.Code.MSG_INVALID_TYPE = 'invalid type: {0}';

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
  if (yamlObject === null) {
    return null;
  }

  var type = sahagin.YamlUtils.getStrValue(yamlObject, 'type');
  var result;
  if (type == sahagin.StringCode.TYPE) {
    result = new sahagin.StringCode();
  } else if (type == sahagin.MethodArgument.TYPE) {
    result = new sahagin.MethodArgument();
  } else if (type == sahagin.SubMethodInvoke.TYPE) {
    result = new sahagin.SubMethodInvoke();
  } else if (type == sahagin.Field.TYPE) {
    result = new sahagin.Field();
  } else if (type == sahagin.LocalVar.TYPE) {
    result = new sahagin.LocalVar();
  } else if (type == sahagin.VarAssign.TYPE) {
    result = new sahagin.VarAssign();
  } else if (type == sahagin.TestStep.TYPE) {
    result = new sahagin.TestStep();
  } else if (type == sahagin.TestStepLabel.TYPE) {
    result = new sahagin.TestStepLabel();
  } else if (type == sahagin.UnknownCode.TYPE) {
    result = new sahagin.UnknownCode();
  } else {
    throw new Error(sahagin.CommonUtils.strFormat(
        sahagin.Code.MSG_INVALID_TYPE, type));
  }
  result.fromYamlObject(yamlObject);
  return result;
};