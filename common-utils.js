/**
 * @namespace
 */
sahagin = {};

sahagin.CommonUtils = {};

/**
 * copied from goog.inherits.
 * see http://docs.closure-library.googlecode.com/git/namespace_goog.html
 */
sahagin.inherits = function(childCtor, parentCtor) {
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  childCtor.prototype.constructor = childCtor;
  childCtor.base = function(me, methodName, var_args) {
    var args = Array.prototype.slice.call(arguments, 2);
    return parentCtor.prototype[methodName].apply(me, args);
  };
};

/**
 * copied from goog.base.
 * see http://docs.closure-library.googlecode.com/git/namespace_goog.html
 */
sahagin.base = function(me, opt_methodName, var_args) {
  var caller = arguments.callee.caller;

  if (caller.superClass_) {
    // This is a constructor. Call the superclass constructor.
    return caller.superClass_.constructor.apply(
        me, Array.prototype.slice.call(arguments, 1));
  }

  var args = Array.prototype.slice.call(arguments, 2);
  var foundCaller = false;
  for (var ctor = me.constructor;
       ctor; ctor = ctor.superClass_ && ctor.superClass_.constructor) {
    if (ctor.prototype[opt_methodName] === caller) {
      foundCaller = true;
    } else if (foundCaller) {
      return ctor.prototype[opt_methodName].apply(me, args);
    }
  }

  if (me[opt_methodName] === caller) {
    return me.constructor.prototype[opt_methodName].apply(me, args);
  } else {
    throw Error(
        'sahagin.base called from a method of one name ' +
        'to a method of a different name');
  }
};

/**
 * @param {string} format
 * @param {...*} args
 * @returns {string}
 */
sahagin.CommonUtils.strFormat = function(format, args) {
  if (!format) {
    return format;
  }
  // use arguments to get all optional arguments
  var formatArgs = arguments;
  return format.replace(/{(\d+)}/g, function(match, number) {
    return formatArgs[parseInt(number) + 1];
  });
};