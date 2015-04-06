/**
 * @class
 */
sahagin.TestStep = function() {
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

  /**
   * @private
   * @type {Array.<sahagin.CodeLine>}
   */
  this.stepBody = new Array();
};
sahagin.inherits(sahagin.TestStep, sahagin.Code);

/**
 * @type {string}
 */
sahagin.TestStep.TYPE = "step";

/**
 * @returns {string}
 */
sahagin.TestStep.prototype.getLabel = function() {
  return this.label;
};

/**
 * @param {string} label
 */
sahagin.TestStep.prototype.setLabel = function(label) {
  this.label = label;
};

/**
 * @returns {string}
 */
sahagin.TestStep.prototype.getText = function() {
  return this.text;
};

/**
 * @param {string} text
 */
sahagin.TestStep.prototype.setText = function(text) {
  this.text = text;
};

/**
 * @returns {Array.<sahagin.CodeLine>}
 */
sahagin.TestStep.prototype.getStepBody = function() {
  return this.stepBody;
};

/**
 * @param {sahagin.CodeLine} step
 */
sahagin.TestStep.prototype.addStepBody = function(step) {
  this.stepBody.push(step);
};

/**
 * @returns {string}
 */
sahagin.TestStep.prototype.getType = function() {
  return sahagin.TestStep.TYPE;
};

/**
 * @returns {Object.<String, *>}
 */
sahagin.TestStep.prototype.toYamlObject = function() {
  var result = sahagin.base(this, 'toYamlObject');
  if (this.label !== null) {
    result['label'] = this.label;
  }
  if (this.text != null) {
    result['text'] = this.text;
  }
  if (this.stepBody.length != 0) {
    result['body'] = sahagin.YamlUtils.toYamlObjectList(this.stepBody);
  }

  return result;
};

/**
 * @param {Object.<string, *>} yamlObject
 */
sahagin.TestStep.prototype.fromYamlObject = function(yamlObject) {
  sahagin.base(this, 'fromYamlObject', yamlObject);
  this.label = sahagin.YamlUtils.getStrValue(yamlObject, 'label', true);
  this.text = sahagin.YamlUtils.getStrValue(yamlObject, 'text', true);
  var stepBodyYamlObj = sahagin.YamlUtils.getYamlObjectListValue(yamlObject, 'body', true);
  this.stepBody = new Array();
  for (var i = 0; i < stepBodyYamlObj.length; i++) {
    var step = new sahagin.CodeLine();
    step.fromYamlObject(stepBodyYamlObj[i]);
    stepBody.push(step);
  }
};