/**
 * @class
 */
sahagin.UnknownCode = function() {
  sahagin.base(this);
};
sahagin.inherits(sahagin.UnknownCode, sahagin.Code);

/**
 * @type {string}
 */
sahagin.UnknownCode.TYPE = "unknown";

/**
 * @returns {string}
 */
sahagin.UnknownCode.prototype.getType = function() {
  return sahagin.UnknownCode.TYPE;
};
