/**
 * @class
 */
sahagin.TestStepLabel = function() {
  sahagin.base(this);

  /**
   * @private
   * @type {string}
   */
  this.label = null;

  /**
   * @private
   * @type {string}
   */
  this.text = null;
};
sahagin.inherits(sahagin.TestStepLabelLabel, sahagin.Code);

/**
 * @type {string}
 */
sahagin.TestStepLabel.TYPE = "stepLabel";

/**
 * @returns {string}
 */
sahagin.TestStepLabel.prototype.getLabel = function() {
  return this.label;
};

/**
 * @param {string} label
 */
sahagin.TestStepLabel.prototype.setLabel = function(label) {
  this.label = label;
};

/**
 * @returns {string}
 */
sahagin.TestStepLabel.prototype.getText = function() {
  return this.text;
};

/**
 * @param {string} text
 */
sahagin.TestStepLabel.prototype.setText = function(text) {
  this.text = text;
};

/**
 * @returns {string}
 */
sahagin.TestStepLabel.prototype.getType = function() {
  return sahagin.TestStepLabel.TYPE;
};

/**
 * @returns {Object.<String, *>}
 */
sahagin.TestStepLabel.prototype.toYamlObject = function() {
  var result = sahagin.base(this, 'toYamlObject');
  if (this.label !== null) {
    result['label'] = this.label;
  }
  if (this.text != null) {
    result['text'] = this.text;
  }

  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.TestStepLabel.prototype.fromYamlObject = function(yamlObject) {
  sahagin.base(this, 'fromYamlObject', yamlObject);
  this.label = sahagin.YamlUtils.getStrValue(yamlObject, 'label', true);
  this.text = sahagin.YamlUtils.getStrValue(yamlObject, 'text', true);
};