(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
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
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
  var lifeCycleHooks = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed'];
  // 策略模式
  var strats = {}; // 存放各种策略
  strats.data = function (parentVal, childVal) {
    // 这里应该有合并策略
    return childVal;
  };
  strats.computed = function () {};
  strats.watch = function () {};

  // 生命周期的合并
  function mergeHook(parentVal, childVal) {
    if (childVal) {
      if (parentVal) {
        return parentVal.concat(childVal); // 后续
      } else {
        return [childVal]; // 第一次
      }
    } else {
      return parentVal;
    }
  }
  lifeCycleHooks.forEach(function (hook) {
    strats[hook] = mergeHook;
  });
  function mergeOptions(parent, child) {
    // 遍历父亲，可能是父亲有，儿子没有
    var options = {};
    for (var key in parent) {
      // 父亲和儿子都有在这就处理了
      mergeField(key);
    }

    // 儿子有父亲没有
    for (var _key in child) {
      if (parent.hasOwnProperty(_key)) {
        continue;
      }
      mergeField(_key);
    }
    function mergeField(key) {
      var parentVal = parent[key];
      var childVal = child[key];
      // 策略模式
      if (strats[key]) {
        // 如果有对应的策略就调用对应的策略即可
        options[key] = strats[key](parentVal, childVal);
      } else {
        if (isObject(parentVal) && isObject(childVal)) {
          options[key] = _objectSpread2(_objectSpread2({}, parentVal), childVal);
        } else {
          // 父亲中有，儿子中没有
          options[key] = child[key] || parent[key];
        }
      }
    }
    return options;
  }

  function initGlobalApi(Vue) {
    Vue.options = {}; // 用来存放全局的配置 , 每个组件初始化的时候都会和options选项进行合并
    Vue.mixin = function (options) {
      // 合并对象 先考虑生命周期，先不考虑其他的合并
      this.options = mergeOptions(this.options, options);
      return this;
    };
  }

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{aaaaa}}

  function genProps(attrs) {
    var str = '';
    var _loop = function _loop() {
      var attr = attrs[i];
      if (attr.name === 'style') {
        var obj = {};
        attr.value.split(';').forEach(function (item) {
          var _item$split = item.split(':'),
            _item$split2 = _slicedToArray(_item$split, 2),
            key = _item$split2[0],
            value = _item$split2[1];
          obj[key] = value;
        });
        attr.value = obj;
      }
      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    };
    for (var i = 0; i < attrs.length; i++) {
      _loop();
    }
    return "{".concat(str.slice(0, -1), "}");
  }
  function gen(el) {
    if (el.type == 1) {
      // element = 1 text = 3
      return generate(el); // 生成元素节点
    } else {
      var text = el.text;
      // 如果是普通文本 不带{{}}
      if (!defaultTagRE.test(text)) {
        return "_v('".concat(text, "')");
      } else {
        var tokens = []; // 存放每一段的代码
        var lastIndex = defaultTagRE.lastIndex = 0; // 如果正则是全局模式，则每次使用前置为0
        var match, index; // 每次匹配到的结果
        while (match = defaultTagRE.exec(text)) {
          index = match.index; // 保存匹配到的索引
          if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
          }
          tokens.push("_s(".concat(match[1].trim(), ")"));
          lastIndex = index + match[0].length;
        }
        if (lastIndex < text.length) {
          tokens.push(JSON.stringify(text.slice(lastIndex)));
        }
        return "_v(".concat(tokens.join('+'), ")");
      }
    }
  }
  function genChildren(el) {
    var children = el.children; // 获取儿子
    if (children) {
      return children.map(function (c) {
        return gen(c);
      }).join(',');
    }
    return false;
  }
  function generate(el) {
    var children = genChildren(el);
    var code = "_c('".concat(el.tag, "',").concat(el.attrs.length ? genProps(el.attrs) : 'undefined').concat(children ? ",".concat(children) : '', ")");
    return code;
  }

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // 标签名
  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); //  用来获取的标签名的 match后的索引为1的
  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 匹配开始标签的
  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // 匹配闭合标签的
  //           aa  =   "  xxx "  | '  xxxx '  | xxx
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // a=b  a="b"  a='b'
  var startTagClose = /^\s*(\/?)>/; //     />   <div/>

  function parseHTML(html) {
    function createASTElement(tagName, attrs) {
      return {
        tag: tagName,
        //标签名
        type: 1,
        // 元素类型
        children: [],
        // 孩子列表
        attrs: attrs,
        // 属性集合
        parent: null // 父元素
      };
    }

    var root;
    var currentParent;
    var stack = [];

    // 开始标签
    function start(tagName, attrs) {
      var element = createASTElement(tagName, attrs);
      if (!root) {
        root = element;
      }
      currentParent = element; // 当前解析的标签保存起来
      stack.push(element);
    }

    // 在结尾标签处创建父子关系
    function end(tagName) {
      var last = stack.pop();
      if (last.tag !== tagName) {
        throw new Error('标签有误');
      }
      currentParent = stack[stack.length - 1];
      if (currentParent) {
        last.parent = currentParent;
        currentParent.children.push(last);
      }
    }
    function charts(text) {
      text = text.replace(/\s/g, '');
      if (text) {
        currentParent.children.push({
          type: 3,
          text: text
        });
      }
    }

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
        // 开始标签
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }
        // 结束标签
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          end(endTagMatch[1]);
          advance(endTagMatch[0].length);
          continue;
        }
      }
      // 文本
      var text = void 0;
      if (textEnd > 0) {
        text = html.substring(0, textEnd);
      }
      if (text) {
        charts(text);
        advance(text.length);
      }
    }
    return root;
  }

  // html => render函数
  function compileToFunctions(template) {
    // 1、需要将html代码转化成ast语法树 可以用ast树来描述语言本身
    var ast = parseHTML(template);
    // 2、优化静态节点
    // 3、通过这棵树 重新生成代码
    var code = generate(ast);
    // 4、将字符串变成函数 通过with来进行取值 稍后调用render函数就可以通过该变this 让这个函数内部取到结果
    var render = new Function("with(this){return ".concat(code, "}"));
    return render;
  }

  // 将虚拟节点转换成真实节点
  // oldVnode => id#app
  // vnode 我们根据模板生成的虚拟dom
  function patch(oldVnode, vnode) {
    if (oldVnode.nodeType == 1) {
      // 用vnode  来生成真实dom 替换原本的dom元素
      var parentElm = oldVnode.parentNode; // 找到他的父亲
      var elm = createElm(vnode); //根据虚拟节点 创建元素
      parentElm.insertBefore(elm, oldVnode.nextSibling);
      parentElm.removeChild(oldVnode);
      return elm;
    }
  }
  function createElm(vnode) {
    var tag = vnode.tag;
      vnode.data;
      var children = vnode.children,
      text = vnode.text;
      vnode.vm;
    if (typeof tag === 'string') {
      // 元素
      vnode.el = document.createElement(tag); // 虚拟节点会有一个el属性 对应真实节点

      // 只有元素才有属性
      updateProperties(vnode);
      children.forEach(function (child) {
        vnode.el.appendChild(createElm(child));
      });
    } else {
      vnode.el = document.createTextNode(text);
    }
    return vnode.el;
  }
  function updateProperties(vnode) {
    var el = vnode.el;
    var newProps = vnode.data || {};
    for (var key in newProps) {
      if (key == 'style') {
        for (var styleName in newProps.style) {
          el.style[styleName] = newProps.style[styleName];
        }
      } else if (key == 'class') {
        el.className = el["class"];
      } else {
        el.setAttribute(key, newProps[key]);
      }
    }
  }

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      var vm = this;
      // 用新的创建的元素，替换老的vm.$el
      vm.$el = patch(vm.$el, vnode);
    };
  }
  function mountComponent(vm, el) {
    // 调用render方法去渲染el属性
    // 先调用render方法创建虚拟节点，再将虚拟节点渲染到页面上
    callHook(vm, 'beforeMount');
    vm._update(vm._render());
    callHook(vm, 'mounted');
  }
  function callHook(vm, hook) {
    var handlers = vm.$options[hook];
    if (handlers) {
      for (var i = 0; i < handlers.length; i++) {
        handlers[i].call(vm);
      }
    }
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
    // 如果对象被观测过
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
      vm.$options = mergeOptions(vm.constructor.options, options); // 需要将用户自定义的options和全局options合并

      callHook(vm, 'beforeCreate');
      // 对数据进行初始化
      initState(vm);
      callHook(vm, 'created');

      // 如果当前有el属性说明要渲染模板
      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    // 1、render 2、template 3、外部template
    Vue.prototype.$mount = function (el) {
      // 挂载操作
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el);
      vm.$el = el;
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

      // 需要挂载这个组件
      mountComponent(vm);
    };
  }

  function renderMixin(Vue) {
    // 创建元素
    Vue.prototype._c = function () {
      return createElement.apply(void 0, [this].concat(Array.prototype.slice.call(arguments)));
    };
    // 创建虚拟dom文本元素
    Vue.prototype._v = function (text) {
      return createTextElement(this, text);
    };
    // stringity
    Vue.prototype._s = function (val) {
      if (_typeof(val) == 'object') return JSON.stringify(val);
      return val;
    };
    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render; // 就是我们解析出来的render方法，同时也有可能是用户写的
      var vnode = render.call(vm);
      return vnode;
    };
  }
  function createElement(vm, tag) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    for (var _len = arguments.length, children = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }
    return vnode(vm, tag, data, data.key, children, undefined);
  }
  function createTextElement(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text);
  }
  function vnode(vm, tag, data, key, children, text) {
    return {
      vm: vm,
      tag: tag,
      data: data,
      key: key,
      children: children,
      text: text
      // .....
    };
  }

  function Vue(options) {
    this._init(options); // 入口方法，做初始化操作
  }

  // 写成一个个的插件进行对原型的扩展
  initMixin(Vue);
  // 混合生命周期 组件挂载、组件更新
  lifecycleMixin(Vue);
  // _render
  renderMixin(Vue);
  initGlobalApi(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
