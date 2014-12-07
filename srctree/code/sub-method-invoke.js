/**
 * @class
 */
sahagin.SubMethodInvoke = function() {
  sahagin.base(this);
};
sahagin.inherits(sahagin.SubMethodInvoke, sahagin.SubFunctionInvoke);

/**
 * @type {string}
 */
sahagin.SubMethodInvoke.TYPE = "method";

/**
 * @returns {string}
 */
sahagin.SubMethodInvoke.prototype.getSubMethodKey = function() {
  return this.getSubFunctionKey();
};

/**
 * @param {string} subMethodKey
 */
sahagin.SubMethodInvoke.prototype.setSubMethodKey = function(subMethodKey) {
  this.setSubFunctionKey(subMethodKey);
};

/**
 * @returns {sahagin.TestMethod}
 */
sahagin.SubMethodInvoke.prototype.getSubMethod = function() {
  return this.getSubFunction();
};

/**
 * @param {sahagin.TestFunction} subFunction
 */
sahagin.SubMethodInvoke.prototype.setSubFunction = function(subFunction) {
  if (!(subFunction instanceof sahagin.TestMethod)) {
    throw new Error('not testMethod: ' + subFunction);
  }
  sahagin.base(this, 'setSubFunction', subFunction);
};

/**
 * @param {sahagin.TestMethod} subMethod
 */
sahagin.SubMethodInvoke.prototype.setSubMethod = function(subMethod) {
  this.setSubFunction(subMethod);
};

/**
 * @returns {string}
 */
sahagin.SubMethodInvoke.prototype.getType = function() {
  return sahagin.SubMethodInvoke.TYPE;
};

/**
 * @returns {string}
 */
sahagin.SubMethodInvoke.prototype.getFunctionKeyName = function() {
  return "methodKey";
};
