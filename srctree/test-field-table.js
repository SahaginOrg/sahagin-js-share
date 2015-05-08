/**
 * @class
 */
sahagin.TestFieldTable = function() {

  /**
   * @private
   * @type {Array.<sahagin.TestField>}
   */
  this.testFields = new Array();
};

/**
 * @returns {Array.<sahagin.TestField>}
 */
sahagin.TestFieldTable.prototype.getTestFields = function() {
  return this.testFields;
};

/**
 * @param {sahagin.TestField} testField
 */
sahagin.TestFieldTable.prototype.addTestField = function(testField) {
  this.testFields.push(testField);
};

/**
 * @returns {boolean}
 */
sahagin.TestFieldTable.prototype.isEmpty = function() {
  this.testFields.length == 0;
};

/**
 * returns null if not found
 * @param {string} key
 * @returns {sahagin.TestField}
 */
sahagin.TestFieldTable.prototype.getByKey = function(key) {
  if (key == null || key == undefined) {
    throw new Error(key);
  }
  for (var i = 0; i < this.testFields.length; i++) {
    var testField = this.testFields[i];
    if (key == testField.getKey()) {
      return testField;
    }
  }
  return null;
};

/**
 * @param {string} classQualifiedName
 * @param {string} fieldSimpleName
 * @returns {Array.<sahagin.TestField>}
 */
sahagin.TestFieldTable.prototype.getByName = function(
    classQualifiedName, fieldSimpleName) {
  if (classQualifiedName == null || classQualifiedName == undefined) {
    throw new Error(classQualifiedName);
  }
  if (fieldSimpleName == null || fieldSimpleName == undefined) {
    throw new Error(fieldSimpleName);
  }
  var result = new Array();
  for (var i = 0; i < this.testFields.length; i++) {
    var testField = this.testFields[i];
    if ((classQualifiedName == testField.getTestClass().getQualifiedName()) &&
        (fieldSimpleName == testField.getSimpleName())) {
      result.push(testField);
    }
  }
  return result;
};

// TODO define sort field as well as Java implementation

/**
 * @returns {Object.<string, *>}
 */
sahagin.TestFieldTable.prototype.toYamlObject = function() {
  var result = new Object();
  if (!this.isEmpty()) {
    result['fields'] = sahagin.YamlUtils.toYamlObjectList(this.testFields);
  }
  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.TestFieldTable.prototype.fromYamlObject = function(yamlObject) {
  var testFieldsYamlObj = sahagin.YamlUtils.getYamlObjectListValue(yamlObject, 'fields', true);
  this.testFields = new Array();
  for (var i = 0; i < testFieldsYamlObj.length; i++) {
    var testField = new sahagin.TestField();
    testField.fromYamlObject(testFieldsYamlObj[i]);
    this.testFields.push(testField);
  }
};