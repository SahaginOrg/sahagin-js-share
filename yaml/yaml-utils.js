sahagin.YamlUtils = {};

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
 * @private
 */
sahagin.YamlUtils.MSG_LIST_MUST_NOT_BE_NULL = 'list must not be null';

/**
 * @param {Object.<string, *>} yamlObject
 * @param {string} key
 * @param {boolean} allowsEmpty default false
 * @returns {Object}
 */
sahagin.YamlUtils.getObjectValue = function(yamlObject, key, allowsEmpty) {
  if (typeof allowsEmpty === 'undefined') {
    allowsEmpty = false;
  }
  if (!yamlObject) {
    throw new Error('empty yamlObject: ' + yamlObject);
  }
  if (!(key in yamlObject)) {
    if (allowsEmpty) {
      return null;
    } else {
      throw new Error(sahagin.CommonUtils.strFormat(
          sahagin.YamlUtils.MSG_KEY_NOT_FOUND, key));
    }
  }
  return yamlObject[key];
};

/**
 * @param {Object.<string, *>} yamlObject
 * @param {string} key
 * @param {boolean} allowsEmpty default false
 * @returns {boolean}
 */
sahagin.YamlUtils.getBooleanValue = function(yamlObject, key, allowsEmpty) {
  if (typeof allowsEmpty === 'undefined') {
    allowsEmpty = false;
  }
  var obj = sahagin.YamlUtils.getObjectValue(yamlObject, key, allowsEmpty);
  if (obj === null) {
    if (allowsEmpty) {
      return null;
    } else {
      throw new Error(sahagin.CommonUtils.strFormat(
          sahagin.YamlUtils.MSG_MUST_BE_BOOLEAN, key, obj));
    }
  } else if (obj === true) {
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
 * @param {boolean} allowsEmpty default false
 * @returns {string}
 */
sahagin.YamlUtils.getStrValue = function(yamlObject, key, allowsEmpty) {
  if (typeof allowsEmpty === 'undefined') {
    allowsEmpty = false;
  }
  var obj = sahagin.YamlUtils.getObjectValue(yamlObject, key, allowsEmpty);
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
 * @param {string} defaultValue optional
 */
sahagin.YamlUtils.strValueEqualsCheck = function(
    yamlObject, key, expected, defaultValue) {
  var defaultAssigned = (typeof defaultValue !== 'undefined');
  var value = sahagin.YamlUtils.getStrValue(yamlObject, key, defaultAssigned);
  if (value === null && defaultAssigned) {
    value = defaultValue;
  }
  if (value != expected) {
    throw new Error(sahagin.CommonUtils.strFormat(
        sahagin.YamlUtils.MSG_NOT_EQUALS_TO_EXPECTED, key, expected));
  }
};

/**
 * @param {Object.<string, *>} yamlObject
 * @param {string} key
 * @param {boolean} allowsEmpty default false
 * @returns {number}
 */
sahagin.YamlUtils.getIntValue = function(yamlObject, key, allowsEmpty) {
  if (typeof allowsEmpty === 'undefined') {
    allowsEmpty = false;
  }
  var obj = sahagin.YamlUtils.getObjectValue(yamlObject, key, allowsEmpty);
  if (obj === null && allowsEmpty) {
    return null;
  }
  var num = parseInt(obj, 10);
  if (isNaN(num)) {
    throw new Error(sahagin.CommonUtils.strFormat(
        sahagin.YamlUtils.MSG_VALUE_NOT_INT, key, obj));
  }
  return num;
};

/**
 * returns null if the value the specified key is null.
 * @param {Object.<string, *>} yamlObject
 * @param {string} key
 * @param {boolean} allowsEmpty default false
 * @returns {Object.<string, *>}
 */
sahagin.YamlUtils.getYamlObjectValue = function(yamlObject, key, allowsEmpty) {
  if (typeof allowsEmpty === 'undefined') {
    allowsEmpty = false;
  }
  // assume the returned object is YAML object
  return sahagin.YamlUtils.getObjectValue(yamlObject, key, allowsEmpty);
};

/**
 * returns empty list if the value the specified key is null.
 * @param {Object.<string, *>} yamlObject
 * @param {string} key
 * @param {boolean} allowsEmpty default false
 * @returns {Array.<string>}
 */
sahagin.YamlUtils.getStrListValue = function(yamlObject, key, allowsEmpty) {
  if (typeof allowsEmpty === 'undefined') {
    allowsEmpty = false;
  }
  var obj = sahagin.YamlUtils.getObjectValue(yamlObject, key, allowsEmpty);
  if (obj === null) {
    if (!allowsEmpty) {
      throw new Error(sahagin.YamlUtils.MSG_LIST_MUST_NOT_BE_NULL);
    }
    return new Array();
  }
  // assume the returned object is string Array
  return obj;
};

/**
 * returns empty list if the value the specified key is null.
 * @param {Object.<string, *>} yamlObject
 * @param {string} key
 * @param {boolean} allowsEmpty default false
 * @returns {Array.<Object.<string, *>>} array of YAML object
 */
sahagin.YamlUtils.getYamlObjectListValue = function(yamlObject, key, allowsEmpty) {
  if (typeof allowsEmpty === 'undefined') {
    allowsEmpty = false;
  }
  var obj = sahagin.YamlUtils.getObjectValue(yamlObject, key, allowsEmpty);
  if (obj === null) {
    if (!allowsEmpty) {
      throw new Error(sahagin.YamlUtils.MSG_LIST_MUST_NOT_BE_NULL);
    }
    return new Array();
  }
  // assume the returned object is YAML object list
  return obj;
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