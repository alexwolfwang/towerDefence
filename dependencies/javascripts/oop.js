/**
 * Created by Alex.W on 2017/3/13.
 */
(function() {
    var initializing = false;
    var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    var cls = function() {};

    cls.extend = function(prop,modifier) {

        var _super = this.prototype;

        initializing = true;
        var prototype = Object.create(this.prototype);
        initializing = false;

        for(var name in prop) {
            prototype[name] = typeof(prop[name]) === 'function' && typeof(_super[name]) === 'function' && fnTest.test(prop[name]) ? (function(name, fn) {
                return function () {
                    var temp = this._super;
                    this._super = _super[name];
                    var ret = fn.apply(this, arguments);
                    this._super = temp;
                    return ret;
                }
            })(name, prop[name]) : prop[name];
        }

        var Class = function() {

            if(!initializing && this.init) {
                this.init.apply(this,arguments)
            }
        }

        Class.prototype = prototype;

        Class.prototype.constructor = Class;

        Class.extend = arguments.callee;

        if(modifier && typeof(modifier) === 'function') {
            modifier(Class)
        }

        return Class;
    };

    this.Class = cls;
})();