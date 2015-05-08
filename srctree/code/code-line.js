/**
 * @class
 */
sahagin.CodeLine = function() {

  /**
   * line start from 1
   * @private
   * @type {number}
   */
  this.startLine = 0;

  /**
   * @private
   * @type {number}
   */
  this.endLine = 0;

  /**
   * @private
   * @type {sahagin.Code}
   */
  this.code = null;
};

/**
 * @returns {number}
 */
sahagin.CodeLine.prototype.getStartLine = function() {
  return this.startLine;
};

/**
 * @param {number} startLine
 */
sahagin.CodeLine.prototype.setStartLine = function(startLine) {
  this.startLine = startLine;
};


/**
 * @returns {number}
 */
sahagin.CodeLine.prototype.getEndLine = function() {
  return this.endLine;
};

/**
 * @param {number} endLine
 */
sahagin.CodeLine.prototype.setEndLine = function(endLine) {
  this.endLine = endLine;
};

/**
 * @returns {sahagin.Code}
 */
sahagin.CodeLine.prototype.getCode = function() {
  return this.code;
};

/**
 * @param {sahagin.Code} code
 */
sahagin.CodeLine.prototype.setCode = function(code) {
  this.code = code;
};

/**
 * @returns {Object.<String, *>}
 */
sahagin.CodeLine.prototype.toYamlObject = function() {
  var result = new Object();
  result['tartLine'] = this.startLine;
  result['endLine'] = this.endLine;
  result['code'] = sahagin.YamlUtils.toYamlObject(this.code);
  return result;
};

/**
 * @param {Object.<String, *>} yamlObject
 */
sahagin.CodeLine.prototype.fromYamlObject = function(yamlObject) {
  this.startLine = sahagin.YamlUtils.getIntValue(yamlObject, 'startLine');
  this.endLine = sahagin.YamlUtils.getIntValue(yamlObject, 'endLine');
  this.code = sahagin.Code.newInstanceFromYamlObject(sahagin.YamlUtils.getYamlObjectValue(yamlObject, 'code'));
};