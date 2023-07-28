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
  // strats.computed = function () {}
  // strats.watch = function () {}

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
  var callbacks = [];
  var pending$1 = false;
  function flushCallbacks() {
    callbacks.forEach(function (cb) {
      return cb();
    }); // 让nextTick中传入的方法依次执行
    pending$1 = false; // 标识已经执行完毕
    callbacks = [];
  }
  function timer(flushCallbacks) {
    var timerFn = function timerFn() {};
    if (Promise) {
      timerFn = function timerFn() {
        Promise.resolve().then(flushCallbacks);
      };
    } else if (MutationObserver) {
      var textNode = document.createTextNode(1);
      var observe = new MutationObserver(flushCallbacks);
      observe.observe(textNode, {
        characterData: true
      });
      timerFn = function timerFn() {
        textNode.textContent = 3;
      };
      // 微任务
    } else if (setImmediate) {
      timerFn = function timerFn() {
        setImmediate(flushCallbacks);
      };
    } else {
      timerFn = function timerFn() {
        setTimeout(flushCallbacks);
      };
    }
    timerFn();
  }
  function nextTick(cb) {
    // 因为内部会调用nextTick 用户也会调用，但是异步只需要一次
    callbacks.push(cb);
    if (!pending$1) {
      timer(flushCallbacks); // 这个方法是异步方法 做了兼容处理
      pending$1 = true;
    }
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

  var id$1 = 0;
  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);
      this.subs = []; // 用来存放watcher的
      this.id = id$1++;
    }
    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        Dep.target.addDep(this); // 实现双向记忆，让watcher记住dep的同时，让dep也记住wathcer
      }
    }, {
      key: "addSub",
      value: function addSub(watcher) {
        this.subs.push(watcher);
      }
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (watcher) {
          return watcher.update();
        });
      }
    }]);
    return Dep;
  }();
  Dep.target = null;
  var stack = [];
  function pushTarget(watcher) {
    Dep.target = watcher;
    stack.push(watcher);
  }
  function popTarget() {
    Dep.target = stack[stack.length - 1];
  }

  // 多对多的关系 一个属性有一个dep，dep是用来收集watcher的
  // dep可以存多个watcher
  // 1个watcher可以对应多个dep

  var queue = []; // 将需要批量更新的watcher存到一个队列中，稍后让watcher执行
  var has = {};
  var pending = false;
  function flushSchedulerQueue() {
    queue.forEach(function (watcher) {
      watcher.run();
      if (watcher.isWatcher) {
        watcher.cb();
      }
    });
    queue = []; // 清空watcher队列
    has = {}; // 清空标识id
    pending = false;
  }
  function queueWatcher(watcher) {
    var id = watcher.id;
    if (has[id] == null) {
      queue.push(watcher); // 将watcher存到队列中
      has[id] = true;
      if (!pending) {
        //如果还没清空队列，就不要再开定时器
        // 等待所有同步代码执行完毕后再执行
        nextTick(flushSchedulerQueue);
        pending = true;
      }
    }
  }

  var id = 0;
  var Watcher = /*#__PURE__*/function () {
    // vm实例
    // exprOrFn vm._update(vm._render())
    function Watcher(vm, exprOrFn, cb, options) {
      _classCallCheck(this, Watcher);
      this.vm = vm;
      this.exprOrFn = exprOrFn;
      this.cb = cb;
      this.options = options;
      this.isWatcher = typeof options == 'boolean'; // 是否为渲染watcher
      this.user = !!options.user; // 是否为用户watcher
      this.lazy = !!options.lazy; // 如果watcher上有lazy属性 说明是一个计算属性
      this.dirty = options.lazy; // dirty代表取值时是否执行用户提供的方法
      this.id = id++; // watcher的唯一标识
      this.deps = []; //记录有多少dep依赖它
      this.depsId = new Set();
      if (typeof exprOrFn == 'function') {
        this.getter = exprOrFn;
      } else {
        // exprOrFn可能传递过来的是一个字符串
        this.getter = function () {
          // 当去当前实例上取值时，才会出发依赖收集
          // age.n  vm['age.n']  =》 vm['age']['n']
          var path = exprOrFn.split('.'); // [age,n]
          var obj = vm;
          for (var i = 0; i < path.length; i++) {
            obj = obj[path[i]];
          }
          return obj;
        };
      }
      // 默认会先调用一次get方法，进行取值，将结果保留下来
      this.value = this.lazy ? void 0 : this.get(); // 默认会调用get方法
    }
    _createClass(Watcher, [{
      key: "addDep",
      value: function addDep(dep) {
        var id = dep.id;
        if (!this.depsId.has(id)) {
          this.deps.push(dep);
          this.depsId.add(id);
          dep.addSub(this);
        }
      }
    }, {
      key: "get",
      value: function get() {
        pushTarget(this); // 当前watcher实例
        var result = this.getter.call(this.vm); // 调用exporOrFn 渲染页面 取值（执行了get方法）
        this.getter();
        popTarget();
        return result;
      }
    }, {
      key: "run",
      value: function run() {
        var newValue = this.get();
        var oldValue = this.value;
        this.value = newValue; // 更新老值
        if (this.user) {
          this.cb.call(this.vm, newValue, oldValue);
        }
      }
    }, {
      key: "update",
      value: function update() {
        if (this.lazy) {
          // 是计算属性
          this.dirty = true;
        } else {
          // 这里不要每次都调用get方法 get方法会重新渲染页面
          queueWatcher(this);
        }
      }
    }, {
      key: "evaluate",
      value: function evaluate() {
        this.dirty = false; // 　取过一次值之后就表示已经取过值了
        this.value = this.get();
      }
    }, {
      key: "depend",
      value: function depend() {
        var i = this.deps.length;
        while (i--) {
          this.deps[i].depend(); // 让depend存储渲染watcher
        }
      }
    }]);
    return Watcher;
  }();

  // 在数据劫持的时候给每个属性都增加了一个dep

  // 1.x先把这个渲染watcher放到Dep.taeget属性上
  // 2.开始渲染，取值会调用get方法，需要让这个属性的dep存储当前的watcher
  // 3.页面上所需要的属性都会将这个watcher存在自己的dep中
  // 4.属性更新就重新调用渲染逻辑，通知自己存储的watcher来更新

  // 将虚拟节点转换成真实节点
  // oldVnode => id#app
  // vnode 我们根据模板生成的虚拟dom
  function patch(oldVnode, vnode) {
    // 默认初始化时，是直接用虚拟节点穿件处真实节点 替换掉老节点
    if (oldVnode.nodeType == 1) {
      // 用vnode  来生成真实dom 替换原本的dom元素
      var parentElm = oldVnode.parentNode; // 找到他的父亲
      var elm = createElm(vnode); //根据虚拟节点 创建元素
      parentElm.insertBefore(elm, oldVnode.nextSibling);
      parentElm.removeChild(oldVnode);
      return elm;
    } else {
      // 在更新的时候，拿老的虚拟节点和新的虚拟节点做对比，将不同的地方更新真实的dom
      // 1、比较两个元素的标签，标签不一样直接替换掉即可
      if (oldVnode.tag !== vnode.tag) {
        return oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el);
      }
      // 标签一样直接复用即可
      var el = vnode.el = oldVnode.el; // 复用老节点

      // 2、有可能是标签一样 <div>1</div> <div>2</div>
      // 文本节点的虚拟节点tag都是undefined
      // 文本的比对
      if (vnode.tag == undefined) {
        // 新老都是文本
        if (oldVnode.text !== vnode.text) {
          return el.textContent = vnode.text;
        }
      }

      // 3、标签一样 并且需要开始比对标签属性和儿子
      // 更新属性，用新的虚拟节点的属性和老的比较，去更新节点
      updateProperties(vnode, oldVnode.data);

      // 儿子比较氛围一下几种情况
      var oldChildren = oldVnode.children || [];
      var newChildren = vnode.children || [];
      if (oldChildren.length > 0 && newChildren.length > 0) {
        // 双方都有儿子
        // vue用了双指针的方式 来比对
        patchChildren(el, oldChildren, newChildren);
      } else if (newChildren.length > 0) {
        // 老的没儿子 但是新的有儿子
        for (var i = 0; i < newChildren.length; i++) {
          var child = createElm(newChildren[i]);
          el.appendChild(child); // 循环创建新节点
        }
      } else if (oldChildren.length > 0) {
        // 老的有儿子 新的没有儿子
        el.innerHTML = ""; // 直接删除老节点
      }
    }
  }

  function isSameVnode(oldVnode, newVnode) {
    return oldVnode.tag == newVnode.tag && oldVnode.key == newVnode.key;
  }
  function patchChildren(el, oldChildren, newChildren) {
    // DOM中操作有很多常见的逻辑 把节点插入到当前儿子的头部、尾部、儿子倒叙正序

    var oldStartIndex = 0; // 老的索引
    var oldStartVnode = oldChildren[0]; // 老的索引指向的节点
    var oldEndIndex = oldChildren.length - 1;
    var oldEndVnode = oldChildren[oldEndIndex];
    var newStartIndex = 0;
    var newStartVnode = newChildren[0];
    var newEndIndex = newChildren.length - 1;
    var newEndVnode = newChildren[newEndIndex];
    var makeIndexByKey = function makeIndexByKey(children) {
      return children.reduce(function (memo, current, index) {
        if (current.key) {
          memo[current.key] = index;
        }
        return memo;
      }, {});
    };
    // 创建映射表
    var keysMap = makeIndexByKey(oldChildren);

    // 做一个循环同时循环老的和新的，哪个先结束 循环就停止，将多余的删除或者添加进去
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
      // 头头比较 尾尾比较 头尾比较 尾头比较
      // 优化了 向后添加， 向前添加，尾巴移动到头部，头部移动到尾部 ，反转
      if (!oldStartVnode) {
        // 已经被移动走了
        oldStartVnode = oldChildren[++oldStartIndex];
      } else if (!oldEndVnode) {
        oldEndVnode = oldChildren[--oldEndIndex];
      }

      // 同时循环新的节点和 老的节点，有一方循环完毕就结束了
      if (isSameVnode(oldStartVnode, newStartVnode)) {
        // 头头比较，发现标签一致，
        patch(oldStartVnode, newStartVnode);
        oldStartVnode = oldChildren[++oldStartIndex];
        newStartVnode = newChildren[++newStartIndex];
      } else if (isSameVnode(oldEndVnode, newEndVnode)) {
        // 从尾部开始比较
        patch(oldEndVnode, newEndVnode);
        oldEndVnode = oldChildren[--oldEndIndex];
        newEndVnode = newChildren[--newEndIndex];
      }

      // 头尾比较  =》 reverse
      else if (isSameVnode(oldStartVnode, newEndVnode)) {
        patch(oldStartVnode, newEndVnode);
        el.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling); // 移动老的元素，老的元素就被移动走了，不用删除
        oldStartVnode = oldChildren[++oldStartIndex];
        newEndVnode = newChildren[--newEndIndex];
      } else if (isSameVnode(oldEndVnode, newStartVnode)) {
        // 尾头比较
        patch(oldEndVnode, newStartVnode);
        el.insertBefore(oldEndVnode.el, oldStartVnode.el);
        oldEndVnode = oldChildren[--oldEndIndex];
        newStartVnode = newChildren[++newStartIndex];
      } else {
        // 乱序比对   核心diff
        // 1.需要根据key和 对应的索引将老的内容生成程映射表
        var moveIndex = keysMap[newStartVnode.key]; // 用新的去老的中查找
        // 不需要移动说明没有key复用的
        if (moveIndex == undefined) {
          // 如果不能复用直接创建新的插入到老的节点开头处
          el.insertBefore(createElm(newStartVnode), oldStartVnode.el);
        } else {
          var moveNode = oldChildren[moveIndex]; // 老的虚拟节点
          oldChildren[moveIndex] = null; // 此节点已经被移动走了
          el.insertBefore(moveNode.el, oldStartVnode.el);
          patch(moveNode, newStartVnode); // 比较两个节点的属性
        }

        newStartVnode = newChildren[++newStartIndex];
      }
    }
    //  如果老的多 将老节点删除 ， 但是可能里面有null 的情况
    if (oldStartIndex <= oldEndIndex) {
      for (var i = oldStartIndex; i <= oldEndIndex; i++) {
        if (oldChildren[i] !== null) el.removeChild(oldChildren[i].el);
      }
    }
    // 如果用户追加了一个怎么办？

    // 这里是没有比对完的
    if (newStartIndex <= newEndIndex) {
      for (var _i = newStartIndex; _i <= newEndIndex; _i++) {
        // el.appendChild(createElm(newChildren[i]))
        // insertBefore方法 他可以appendChild功能 insertBefore(节点,null)  dom api

        //  看一下为指针的下一个元素是否存在
        var anchor = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].el;
        el.insertBefore(createElm(newChildren[_i]), anchor);
      }
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
    var oldProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var newProps = vnode.data || {}; // 新的属性
    var el = vnode.el;

    // 样式处理 老的style={color:red} 新的 style={background: red}
    var newStyle = newProps.style || {};
    var oldStyle = oldProps.style || {};
    // 老的样式中有 新的没有 删除老的样式
    for (var key in oldStyle) {
      if (!newStyle[key]) {
        // 新的里面不存在这个样式
        el.style[key] = '';
      }
    }

    // 老的有新的没有 需要删除属性
    for (var _key in oldProps) {
      if (!newProps[_key]) {
        el.removeAttribute(_key); // 移除真实dom的属性
      }
    }

    // 新的有 那就直接用新的去做更新即可
    for (var _key2 in newProps) {
      if (_key2 == 'style') {
        for (var styleName in newProps.style) {
          el.style[styleName] = newProps.style[styleName];
        }
      } else if (_key2 == 'class') {
        el.className = newProps["class"];
      } else {
        el.setAttribute(_key2, newProps[_key2]);
      }
    }
  }

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      var vm = this;
      // 这里需要区分下到底是首次渲染还是更新
      var prevVnode = vm._vnode;
      if (!prevVnode) {
        // 用新的创建的元素，替换老的vm.$el
        vm.$el = patch(vm.$el, vnode);
      } else {
        vm.$el = patch(prevVnode, vnode);
      }
      vm._vnode = vnode;
    };
  }
  function mountComponent(vm, el) {
    // 调用render方法去渲染el属性
    // 先调用render方法创建虚拟节点，再将虚拟节点渲染到页面上
    callHook(vm, 'beforeMount');
    var updateComponent = function updateComponent() {
      vm._update(vm._render());
    };
    // 这个watcher是用于渲染的，目前没有任何功能
    new Watcher(vm, updateComponent, function () {
      callHook(vm, 'updated');
    }, true);
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
      // 我们要知道数组对应哪个dep
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
      ob.dep.notify();
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);
      this.dep = new Dep(); // 数据可能是数组或者对象
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
    var childDep = observe(value); // 获取到数组对应的dep

    var dep = new Dep(); // 每个属性都有一个dep

    // 当页面取值时，说明这个值渲染了，将这个watcher和这个属性对应起来
    Object.defineProperty(data, key, {
      // 依赖收集
      get: function get() {
        if (Dep.target) {
          // 让属性记住这个watcher
          dep.depend();
          if (childDep) {
            // 默认给数组增加了一个dep属性，当对数组这个对象取值的时候
            childDep.dep.depend(); // 数组存起来了这个渲染watcher
          }
        }

        return value;
      },
      // 依赖更新
      set: function set(newValue) {
        if (newValue == value) return;
        observe(newValue); // 如果用户赋值一个新对象 ，需要将这个对象进行劫持
        value = newValue;
        dep.notify(); // 告诉当前的属性存放的watcher执行
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
    if (opts.computed) {
      initComputed(vm);
    }
    if (opts.watch) {
      initWatch(vm);
    }
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
  function initComputed(vm) {
    var computed = vm.$options.computed;
    var watchers = vm._computedWatchers = {}; // 稍后存放计算属性的
    for (var key in computed) {
      var userDef = computed[key]; // 取出对应的值
      // 获取get方法
      var getter = typeof userDef == 'function' ? userDef : userDef.get; // watcher使用

      watchers[key] = new Watcher(vm, getter, function () {}, {
        lazy: true
      });
      definecomputed(vm, key, userDef);
    }
  }
  var sharePropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: function get() {},
    set: function set() {}
  };
  function definecomputed(target, key, userDef) {
    if (typeof userDef == 'function') {
      sharePropertyDefinition.get = createComputedGetter(key);
    } else {
      sharePropertyDefinition.get = createComputedGetter(key); // 需要加缓存
      sharePropertyDefinition.set = userDef.set;
    }
    Object.defineProperty(target, key, sharePropertyDefinition);
  }
  function createComputedGetter(key) {
    // 此方法是我们包装的方法 每次取值会调用此方法
    return function computedGetter() {
      var watcher = this._computedWatchers[key]; //拿到属性对应的watcher
      if (watcher) {
        // 判断到底要不要执行用户传递的方法
        if (watcher.dirty) {
          watcher.evaluate(); // 对当前的watcher求值
        }

        if (Dep.target) {
          watcher.depend();
        }
        return watcher.value; // 默认返回watcher上
      }
    };
  }

  function initWatch(vm) {
    var watch = vm.$options.watch;
    var _loop = function _loop(key) {
      var handler = watch[key]; //handler可能是数组、字符串、对象、函数
      if (Array.isArray(handler)) {
        //数组
        handler.forEach(function (handler) {
          createWatcher(vm, key, handler);
        });
      } else {
        createWatcher(vm, key, handler); //字符串、对象、函数
      }
    };
    for (var key in watch) {
      _loop(key);
    }
  }

  // options可以用来标识是用户watcher
  function createWatcher(vm, exprOrFn, handler, options) {
    if (_typeof(handler) == 'object') {
      options = handler;
      handler = handler.handler; // 是一个函数
    }

    if (typeof handler == 'string') {
      handler = vm[handler]; // 将实例的方法作为handler
    }

    return vm.$watch(exprOrFn, handler, options);
  }
  function stateMixin(Vue) {
    Vue.prototype.$nextTick = function (cb) {
      nextTick(cb);
    };
    Vue.prototype.$watch = function (exprOrFn, cb) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      // 数据应该依赖这个watcher 数据变化后应该让watcher从新执行
      // vm,name,用户回调，options.user
      new Watcher(this, exprOrFn, cb, _objectSpread2(_objectSpread2({}, options), {}, {
        user: true
      }));
      if (options.immediate) {
        cb(); // 如果是immediate应该立刻执行
      }
    };
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
  stateMixin(Vue);
  initGlobalApi(Vue);

  // 为了看到diff的整个流程，创建两个虚拟节点来进行比对操作
  var vm1 = new Vue({
    data: {
      name: 'zf'
    }
  });
  var render1 = compileToFunctions("<div>\n        <li style=\"background:red\">A</li>\n        <li style=\"background:yellow\">B</li>\n        <li style=\"background:pink\">C</li>\n        <li style=\"background:green\">D</li>\n    </div>");
  var vnode1 = render1.call(vm1); // render方法返回虚拟dom
  document.body.appendChild(createElm(vnode1));
  var vm2 = new Vue({
    data: {
      name: 'jw'
    }
  });
  var render2 = compileToFunctions("<div>\n        <li style=\"background:red\">A</li>\n        <li style=\"background:yellow\">B</li>\n        <li style=\"background:pink\">C</li>\n        <li style=\"background:green\">D</li>\n        <li style=\"background:blue\">E</li>\n    </div>");
  var vnode2 = render2.call(vm2); // render方法返回虚拟dom

  setTimeout(function () {
    patch(vnode1, vnode2); // 传入新的虚拟节点和老的对比
  }, 3000);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
