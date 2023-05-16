(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    // html => render函数
    // ast语法树

    var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // 标签名
    var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); //  用来获取的标签名的 match后的索引为1的
    var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 匹配开始标签的
    //           aa  =   "  xxx "  | '  xxxx '  | xxx
    var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // a=b  a="b"  a='b'
    var startTagClose = /^\s*(\/?)>/; //     />   <div/>

    // 开始标签
    function start(tagName, attrs) {}
    function parseHTML(html) {
      // 截取字符串
      function advance(n) {
        html = html.substring(n);
      }
      // 匹配开始
      function parseStartTag() {
        var start = html.match(startTagOpen);
        if (start) {
          var match = {
            tagName: start[1],
            attrs: []
          };
          // 删除开始标签
          advance(start[0].length);

          // 不是结尾并且有属性
          var _end;
          var attr;
          while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            match.attrs.push({
              name: attr[1],
              value: attr[3] || attr[4] || attr[5]
            });
            advance(attr[0].length);
          }
          if (_end) {
            advance(_end[0].length);
          }
          return match;
        }
        return false; // 不是开始标签
      }
      // 只要html不为空就一直解析
      while (html) {
        var textEnd = html.indexOf('<');
        if (textEnd == 0) {
          var startTagMatch = parseStartTag();
          if (startTagMatch) {
            start(startTagMatch.tagName, startTagMatch.attrs);
            // continue
          }

          console.log(html);
          break;
        }
      }
    }
    function compileToFunctions(template) {
      // 1、需要将html代码转化成ast语法树 可以用ast树来描述语言本身
      parseHTML(template);
      // 2、通过这棵树 重新生成代码
    }

    function _typeof(obj) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, _typeof(obj);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", {
        writable: false
      });
      return Constructor;
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }

    function isFunction(val) {
      return typeof val === 'function';
    }
    function isObject(val) {
      return _typeof(val) == 'object' && val !== null;
    }

    // 代理
    function proxy(vm, source, key) {
      Object.defineProperty(vm, key, {
        get: function get() {
          return vm[source][key];
        },
        set: function set(newValue) {
          vm[source][key] = newValue;
        }
      });
    }
    function defineProperty(target, key, value) {
      Object.defineProperty(target, key, {
        enumerable: false,
        // 不能被枚举
        configurable: false,
        value: value
      });
    }

    // 拿到数组原型上的方法
    var oldArrayPrototype = Array.prototype;
    var arrayMethods = Object.create(oldArrayPrototype);
    var methods = ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice'];
    methods.forEach(function (method) {
      // 用户调用的如果是以上七个方法 会用我自己重写的，否则用原来的数组方法
      arrayMethods[method] = function () {
        var _oldArrayPrototype$me;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        //  args 是参数列表 arr.push(1,2,3)
        (_oldArrayPrototype$me = oldArrayPrototype[method]).call.apply(_oldArrayPrototype$me, [this].concat(args));
        var inserted;
        var ob = this.__ob__; // 根据当前数组获取到observer实例
        switch (method) {
          case 'push':
          case 'unshift':
            inserted = args; // 就是新增的内容
            break;
          case 'splice':
            inserted = args.slice(2);
        }
        // 如果有新增的内容要进行继续劫持, 我需要观测的数组里的每一项，而不是数组
        if (inserted) ob.observeArray(inserted);
      };
    });

    var Observer = /*#__PURE__*/function () {
      function Observer(data) {
        _classCallCheck(this, Observer);
        // 判断一个对象是否被观测过，看他有没有__ob__这个属性
        defineProperty(data, '__ob__', this);

        // 使用defineProperty重新定义属性
        if (Array.isArray(data)) {
          // 函数劫持
          data.__proto__ = arrayMethods;
          this.observeArray(data);
        } else {
          this.walk(data);
        }
      }
      _createClass(Observer, [{
        key: "observeArray",
        value: function observeArray(data) {
          // 对我们数组的数组 和 数组中的对象再次劫持 递归了 [{a:1},{b:2}]
          data.forEach(function (item) {
            return observe(item);
          });
        }
      }, {
        key: "walk",
        value: function walk(data) {
          Object.keys(data).forEach(function (key) {
            defineReactive(data, key, data[key]);
          });
        }
      }]);
      return Observer;
    }();
    function defineReactive(data, key, value) {
      observe(value); // 本身用户默认值是对象套对象 需要递归处理
      Object.defineProperty(data, key, {
        get: function get() {
          console.log('用户获取值了');
          return value;
        },
        set: function set(newValue) {
          console.log('用户设置值了');
          if (newValue == value) return;
          observe(newValue); // 如果用户赋值一个新对象 ，需要将这个对象进行劫持
          value = newValue;
        }
      });
    }
    function observe(data) {
      // 如果是对象才观测
      if (!isObject(data)) {
        return;
      }
      if (data.__ob__) {
        return;
      }
      return new Observer(data);
    }

    function initState(vm) {
      var opts = vm.$options;
      if (opts.props) ;
      if (opts.methods) ;
      if (opts.data) {
        initData(vm);
      }
      if (opts.computed) ;
      if (opts.watch) ;
    }
    function initData(vm) {
      var data = vm.$options.data;
      data = vm._data = isFunction(data) ? data.call(vm) : data;

      // 用户去vm.xxx => vm._data.xxx
      for (var key in data) {
        proxy(vm, '_data', key);
      }

      // 数据劫持
      observe(vm._data);
    }

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        var vm = this;
        vm.$options = options;

        // 对数据进行初始化
        initState(vm);

        // 如果当前有el属性说明要渲染模板
        if (vm.$options.el) {
          vm.$mount(vm.$options.el);
        }
      };
      Vue.prototype.$mount = function (el) {
        // 挂载操作
        var vm = this;
        var options = vm.$options;
        el = document.querySelector(el);
        console.log(el);
        if (!options.render) {
          //没有render 将template转换成render方法
          var template = options.template;
          if (!template && el) {
            template = el.outerHTML;
          }
          // 编译原理 将模板编译成render函数
          var render = compileToFunctions(template);
          options.render = render;
        }
        // console.log(options.render) // 渲染时用的都是这个render方法
        // 有render方法
      };
    }

    function Vue(options) {
      this._init(options); // 入口方法，做初始化操作
    }

    // 写成一个个的插件进行对原型的扩展
    initMixin(Vue);

    return Vue;

}));
//# sourceMappingURL=vue.js.map
