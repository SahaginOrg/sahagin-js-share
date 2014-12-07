/**
 * @class
 */
sahagin.PageClass = function() {
  sahagin.base(this);
};
sahagin.inherits(sahagin.PageClass, sahagin.TestClass);

/**
 * @type {string}
 */
sahagin.PageClass.TYPE = 'page';

/**
 * @returns {string}
 */
sahagin.PageClass.prototype.getType = function() {
  return sahagin.PageClass.TYPE;
};