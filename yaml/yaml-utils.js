sahagin.YamlUtils = {};

// TODO support allowsEmpty switch like YamlUtils.java

/**
 * @private
 */
sahagin.YamlUtils.MSG_KEY_NOT_FOUND = 'key "{0}" is not found';

/**
 * @private
 */
sahagin.YamlUtils.MSG_MUST_BE_BOOLEAN
= 'value for "{0}" must be "true" or "false", but is "{1}"';

/**
 * @private
 */
sahagin.YamlUtils.MSG_VALUE_NOT_INT = 'can\'t convert value to int; key: {0}; vaule: {1}';

/**
 * @private
 */
sahagin.YamlUtils.MSG_NOT_EQUALS_TO_EXPECTED = '"{0}" is not equals to "{1}"';

/**
 * @param {Object.<string, *>} yamlObject
 * @param {string} key
 * @returns {Object}
 */
sahagin.YamlUtils.getObjectValue = function(yamlObject, key) {
  if (!yamlObject) {
    throw new Error('empty yamlObject: ' + yamlObject);
  }
  if (!(key in yamlObject)) {
    throw new Error(sahagin.CommonUtils.strFormat(
        sahagin.YamlUtils.MSG_KEY_NOT_FOUND, key));
  }
  return yamlObject[key];
};

/**
 * @param {Object.<string, *>} yamlObject
 * @param {string} key
 * @returns {boolean}
 */
sahagin.YamlUtils.getBooleanValue = function(yamlObject, key) {
  var obj = sahagin.YamlUtils.getObjectValue(yamlObject, key);
  if (obj === true) {
    return true;
  } else if (obj === false) {
    return false;
  } else {
    throw new Error(sahagin.CommonUtils.strFormat(
        sahagin.YamlUtils.MSG_MUST_BE_BOOLEAN, key, obj));
  }
};

/**
 * @param {Object.<string, *>} yamlObject
 * @param {string} key
 * @returns {string}
 */
sahagin.YamlUtils.getStrValue = function(yamlObject, key) {
  var obj = sahagin.YamlUtils.getObjectValue(yamlObject, key);
  if (obj === null || obj === undefined) {
    return obj;
  } else {
    return obj.toString();
  }
};

/**
 * @param {Object.<string, *>} yamlObject
 * @param {string} key
 * @param {string} expected
 */
sahagin.YamlUtils.strValueEqualsCheck = function(yamlObject, key, expected) {
  var value = sahagin.YamlUtils.getStrValue(yamlObject, key);
  if (value != expected) {
    throw new Error(sahagin.CommonUtils.strFormat(
        sahagin.YamlUtils.MSG_NOT_EQUALS_TO_EXPECTED, key, expected));
  }
};

/**
 * returns empty list if the value the specified key is null.
 * @param {Object.<string, *>} yamlObject
 * @param {string} key
 * @returns {Array.<string>}
 */
sahagin.YamlUtils.getStrListValue = function(yamlObject, key) {
  // assume the returned object is string Array
  return sahagin.YamlUtils.getObjectValue(yamlObject, key);
};

/**
 * returns empty map if the value the specified key is null.
 * @param {Object.<string, *>} yamlObject
 * @param {string} key
 * @returns {Object.<string, *>}
 */
sahagin.YamlUtils.getYamlObjectValue = function(yamlObject, key) {
  // assume the returned object is YAML object
  return sahagin.YamlUtils.getObjectValue(yamlObject, key);
};

/**
 * returns empty map if the value the specified key is null.
 * @param {Object.<string, *>} yamlObject
 * @param {string} key
 * @returns {Array.<Object.<string, *>>} array of YAML object
 */
sahagin.YamlUtils.getYamlObjectListValue = function(yamlObject, key) {
  // assume the returned object is YAML object list
  return sahagin.YamlUtils.getObjectValue(yamlObject, key);
};

/**
 * @param {Object.<string, *>} yamlObject
 * @param {string} key
 * @returns {number}
 */
sahagin.YamlUtils.getIntValue = function(yamlObject, key) {
  var obj = sahagin.YamlUtils.getObjectValue(yamlObject, key);
  var num = parseInt(obj, 10);
  if (isNaN(num)) {
    throw new Error(sahagin.CommonUtils.strFormat(
        sahagin.YamlUtils.MSG_VALUE_NOT_INT, key, obj));
  }
  return num;
};

/**
 * @param {Array.<Object>} srcList list of YAML convertible object
 * @returns {Array.<Object.<string, *>>} array of YAML object
 */
sahagin.YamlUtils.toYamlObjectList = function(srcList) {
  var result = new Array();
  for (var i = 0; i < srcList.length; i++) {
    var yamlObj = srcList[i].toYamlObject();
    result.push(yamlObj);
  }
  return result;
};