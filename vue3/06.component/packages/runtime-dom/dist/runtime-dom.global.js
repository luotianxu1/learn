var vueRuntimeDom = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // packages/runtime-dom/src/index.ts
  var src_exports = {};
  __export(src_exports, {
    Fragment: () => Fragment,
    KeepAlive: () => KeepAlive,
    LifeCycle: () => LifeCycle,
    ReactiveEffect: () => ReactiveEffect,
    Text: () => Text,
    computed: () => computed,
    createRenderer: () => createRenderer,
    createVNode: () => createVNode,
    defineAsyncComponent: () => defineAsyncComponent,
    effect: () => effect,
    getCurrentInstance: () => getCurrentInstance,
    h: () => h,
    inject: () => inject,
    onBeforeMount: () => onBeforeMount,
    onBeforeUnmount: () => onBeforeUnmount,
    onBeforeUpdate: () => onBeforeUpdate,
    onMounted: () => onMounted,
    onUnmounted: () => onUnmounted,
    onUpdated: () => onUpdated,
    provide: () => provide,
    proxyRefs: () => proxyRefs,
    reactive: () => reactive,
    ref: () => ref,
    render: () => render,
    setCurrentInstance: () => setCurrentInstance,
    toRef: () => toRef,
    toRefs: () => toRefs,
    watch: () => watch
  });

  // packages/runtime-dom/src/nodeOps.ts
  var nodeOps = {
    createElement(tagname) {
      return document.createElement(tagname);
    },
    createTextNode(text) {
      return document.createTextNode(text);
    },
    insert(element, container, anchor = null) {
      container.insertBefore(element, anchor);
    },
    remove(child) {
      const parent = child.parentNode;
      if (parent) {
        parent.removeChild(child);
      }
    },
    querySelector(selectors) {
      return document.querySelector(selectors);
    },
    parentNode(child) {
      return child.parentNode;
    },
    nextSibling(child) {
      return child.nextSibling;
    },
    setText(textNode, text) {
      textNode.nodeValue = text;
    },
    setElementText(element, text) {
      element.textContent = text;
    }
  };

  // packages/runtime-dom/src/modules/attr.ts
  function patchAttr(el, key, nextVal) {
    if (nextVal) {
      el.setAttribute(key, nextVal);
    } else {
      el.removeAttribute(key);
    }
  }

  // packages/runtime-dom/src/modules/class.ts
  function patchClass(el, nextVal) {
    if (nextVal == null) {
      el.removeAttribute("class");
    } else {
      el.className = nextVal;
    }
  }

  // packages/runtime-dom/src/modules/event.ts
  function createInvoker(nextVal) {
    const fn = (e) => fn.value(e);
    fn.value = nextVal;
    return fn;
  }
  function patchEvent(el, rawName, nextVal) {
    const invokers = el._vei || (el._vei = {});
    let eventName = rawName.slice(2).toLowerCase();
    const exisitingInvoker = invokers[eventName];
    if (nextVal && exisitingInvoker) {
      exisitingInvoker.value = nextVal;
    } else {
      if (nextVal) {
        const invoker = invokers[eventName] = createInvoker(nextVal);
        el.addEventListener(eventName, invoker);
      } else if (exisitingInvoker) {
        el.removeEventListener(eventName, exisitingInvoker);
        invokers[eventName] = null;
      }
    }
  }

  // packages/runtime-dom/src/modules/style.ts
  function patchStyle(el, prevVal, nextVal) {
    if (prevVal == null)
      prevVal = {};
    if (nextVal == null)
      nextVal = {};
    const style = el.style;
    if (nextVal) {
      for (let key in nextVal) {
        style[key] = nextVal[key];
      }
    }
    if (prevVal) {
      for (let key in prevVal) {
        if (nextVal[key] == null) {
          style[key] = null;
        }
      }
    }
  }

  // packages/runtime-dom/src/patchProp.ts
  function patchProp(el, key, prevVal, nextVal) {
    if (key === "class") {
      patchClass(el, nextVal);
    } else if (key === "style") {
      patchStyle(el, prevVal, nextVal);
    } else if (/^on[^a-z]/.test(key)) {
      patchEvent(el, key, nextVal);
    } else {
      patchAttr(el, key, nextVal);
    }
  }

  // packages/shared/src/index.ts
  var isObject = (value) => {
    return typeof value === "object" && value !== null;
  };
  var isFunction = (value) => {
    return typeof value === "function";
  };
  function isString(value) {
    return typeof value === "string";
  }
  var isArray = Array.isArray;
  function isNumber(value) {
    return typeof value === "number";
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasOwn = (obj, key) => hasOwnProperty.call(obj, key);
  function invokerFns(fns) {
    for (let i = 0; i < fns.length; i++) {
      fns[i]();
    }
  }

  // packages/runtime-core/src/createVNode.ts
  var Text = Symbol("Text");
  var Fragment = Symbol("Fragment");
  function isVNode(value) {
    return !!value.__v_isVNode;
  }
  function createVNode(type, props = null, children = null) {
    const shapeFlag = isString(type) ? 1 /* ELEMENT */ : isObject(type) ? 4 /* STATEFUL_COMPONENT */ : 0;
    const vnode = {
      __v_isVNode: true,
      type,
      props,
      children,
      key: props == null ? void 0 : props.key,
      el: null,
      shapeFlag
    };
    if (children != void 0) {
      let type2 = 0;
      if (Array.isArray(children)) {
        type2 = 16 /* ARRAY_CHILDREN */;
      } else if (isObject(children)) {
        type2 = 32 /* SLOTS_CHILDREN */;
      } else {
        vnode.children = String(children);
        type2 = 8 /* TEXT_CHILDREN */;
      }
      vnode.shapeFlag |= type2;
    }
    return vnode;
  }

  // packages/runtime-core/src/h.ts
  function h(type, propsOrChildren, children) {
    const l = arguments.length;
    if (l === 2) {
      if (isObject(propsOrChildren) && !Array.isArray(propsOrChildren)) {
        if (isVNode(propsOrChildren)) {
          return createVNode(type, null, [propsOrChildren]);
        }
        return createVNode(type, propsOrChildren);
      } else {
        return createVNode(type, null, propsOrChildren);
      }
    } else {
      if (l === 3 && isVNode(children)) {
        children = [children];
      } else if (l > 3) {
        children = Array.from(arguments).slice(2);
      }
      return createVNode(type, propsOrChildren, children);
    }
  }

  // packages/runtime-core/src/sequence.ts
  function getSequence(arr) {
    let len = arr.length;
    const p = arr.slice(0).fill(-1);
    let result = [0];
    let lastIndex;
    let start;
    let end;
    let middle;
    for (let i2 = 0; i2 < len; i2++) {
      const arrI = arr[i2];
      if (arrI !== 0) {
        lastIndex = result[result.length - 1];
        if (arr[lastIndex] < arrI) {
          result.push(i2);
          p[i2] = lastIndex;
          continue;
        }
        start = 0;
        end = result.length - 1;
        while (start < end) {
          middle = Math.floor((start + end) / 2);
          if (arr[result[middle]] < arrI) {
            start = middle + 1;
          } else {
            end = middle;
          }
        }
        if (arrI < arr[result[end]]) {
          p[i2] = result[end - 1];
          result[end] = i2;
        }
      }
    }
    let i = result.length;
    let last = result[i - 1];
    while (i-- > 0) {
      result[i] = last;
      last = p[last];
    }
    return result;
  }

  // packages/reactivity/src/effect.ts
  var activeEffect = void 0;
  function cleanEffect(effect2) {
    let deps = effect2.deps;
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect2);
    }
    effect2.deps.length = 0;
  }
  var ReactiveEffect = class {
    constructor(fn, scheduler) {
      this.fn = fn;
      this.scheduler = scheduler;
      this.active = true;
      this.parent = null;
      this.deps = [];
    }
    run() {
      if (!this.active) {
        return this.fn();
      } else {
        try {
          this.parent = activeEffect;
          activeEffect = this;
          cleanEffect(this);
          return this.fn();
        } finally {
          activeEffect = this.parent;
          this.parent = null;
        }
      }
    }
    stop() {
      if (this.active) {
        this.active = false;
        cleanEffect(this);
      }
    }
  };
  var targetMap = /* @__PURE__ */ new WeakMap();
  function trigger(target, key, value) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    let effects = depsMap.get(key);
    triggerEffects(effects);
  }
  function triggerEffects(effects) {
    if (effects) {
      effects = new Set(effects);
      effects.forEach((effect2) => {
        if (effect2 !== activeEffect) {
          if (effect2.scheduler) {
            effect2.scheduler();
          } else {
            effect2.run();
          }
        }
      });
    }
  }
  function track(target, key) {
    if (activeEffect) {
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
      }
      let deps = depsMap.get(key);
      if (!deps) {
        depsMap.set(key, deps = /* @__PURE__ */ new Set());
      }
      trackEffects(deps);
    }
  }
  function trackEffects(deps) {
    let shouldTrack = !deps.has(activeEffect);
    if (shouldTrack) {
      deps.add(activeEffect);
      activeEffect.deps.push(deps);
    }
  }
  function effect(fn, options = {}) {
    const _effect = new ReactiveEffect(fn, options.scheduler);
    _effect.run();
    const runner = _effect.run.bind(_effect);
    runner.effect = _effect;
    return runner;
  }

  // packages/reactivity/src/basehandler.ts
  function isReactive(value) {
    return value && value["_v_isReactive" /* IS_REACTIVE */];
  }
  var baseHandler = {
    get(target, key, receiver) {
      if (key === "_v_isReactive" /* IS_REACTIVE */) {
        return true;
      }
      track(target, key);
      let res = Reflect.get(target, key, receiver);
      if (isObject(res)) {
        return reactive(res);
      }
      return res;
    },
    set(target, key, value, receiver) {
      let oldValue = target[key];
      if (oldValue !== value) {
        let result = Reflect.set(target, key, value, receiver);
        trigger(target, key, value);
        return result;
      }
    }
  };

  // packages/reactivity/src/reactive.ts
  var reactiveMap = /* @__PURE__ */ new WeakMap();
  function reactive(target) {
    if (!isObject(target)) {
      return target;
    }
    if (target["_v_isReactive" /* IS_REACTIVE */]) {
      return target;
    }
    const existing = reactiveMap.get(target);
    if (existing) {
      return existing;
    }
    const proxy = new Proxy(target, baseHandler);
    reactiveMap.set(target, proxy);
    return proxy;
  }

  // packages/reactivity/src/computed.ts
  function computed(getterOrOptions) {
    let isGetter = isFunction(getterOrOptions);
    let getter;
    let setter;
    const fn = () => console.warn("computed is readonly");
    if (isGetter) {
      getter = getterOrOptions;
      setter = () => fn;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set || fn;
    }
    return new ComputedRefImpl(getter, setter);
  }
  var ComputedRefImpl = class {
    constructor(getter, setter) {
      this.setter = setter;
      this._dirty = true;
      this.__v_isRef = true;
      this.effect = new ReactiveEffect(getter, () => {
        if (!this._dirty) {
          this._dirty = true;
          triggerEffects(this.deps);
        }
      });
    }
    get value() {
      if (activeEffect) {
        trackEffects(this.deps || (this.deps = /* @__PURE__ */ new Set()));
      }
      if (this._dirty) {
        this._dirty = false;
        this._value = this.effect.run();
      }
      return this._value;
    }
    set value(newValues) {
      this.setter(newValues);
    }
  };

  // packages/reactivity/src/watch.ts
  function traversal(value, set = /* @__PURE__ */ new Set()) {
    if (!isObject(value)) {
      return value;
    }
    if (set.has(value)) {
      return value;
    }
    set.add(value);
    for (let key in value) {
      traversal(value[key], set);
    }
    return value;
  }
  function watch(source, cb) {
    let get;
    if (isReactive(source)) {
      get = () => traversal(source);
    } else if (isFunction(source)) {
      get = source;
    }
    let oldValue;
    let cleanup;
    const onCleanup = (fn) => {
      cleanup = fn;
    };
    const job = () => {
      if (cleanup)
        cleanup();
      let newValue = effect2.run();
      cb(newValue, oldValue, onCleanup);
      oldValue = newValue;
    };
    const effect2 = new ReactiveEffect(get, job);
    oldValue = effect2.run();
  }

  // packages/reactivity/src/ref.ts
  function ref(value) {
    return new RefImpl(value);
  }
  function isRef(value) {
    return !!(value && value.__v_isRef);
  }
  function toRef(object, key) {
    return new ObjectRefImpl(object, key);
  }
  function toRefs(object) {
    let result = {};
    for (let key in object) {
      result[key] = toRef(object, key);
    }
    return result;
  }
  function proxyRefs(object) {
    return new Proxy(object, {
      get(target, key, receiver) {
        let r = Reflect.get(target, key, receiver);
        return isRef(r) ? r.value : r;
      },
      set(target, key, value, receiver) {
        let oldValue = Reflect.get(target, key, receiver);
        if (isRef(oldValue)) {
          oldValue.value = value;
          return true;
        } else {
          return Reflect.set(target, key, value, receiver);
        }
      }
    });
  }
  function toReactive(value) {
    return isObject(value) ? reactive(value) : value;
  }
  var ObjectRefImpl = class {
    constructor(object, key) {
      this.object = object;
      this.key = key;
      this.__v_isRef = true;
    }
    get value() {
      return this.object[this.key];
    }
    set value(newVlaue) {
      this.object[this.key] = newVlaue;
    }
  };
  var RefImpl = class {
    constructor(rawValue) {
      this.rawValue = rawValue;
      this.__v_isRef = true;
      this._value = toReactive(rawValue);
    }
    get value() {
      trackEffects(this.dep || (this.dep = /* @__PURE__ */ new Set()));
      return this._value;
    }
    set value(newVal) {
      if (newVal !== this.rawValue) {
        this._value = toReactive(newVal);
        this.rawValue = newVal;
        triggerEffects(this.dep);
      }
    }
  };

  // packages/runtime-core/src/component.ts
  var instance = null;
  function setCurrentInstance(i) {
    instance = i;
  }
  var getCurrentInstance = () => instance;
  function createComponentInstance(vnode, parent) {
    const instance2 = {
      ctx: {},
      state: {},
      isMounted: false,
      subTree: null,
      vnode,
      update: null,
      attrs: {},
      props: {},
      propsOptions: vnode.type.props || {},
      proxy: null,
      render: null,
      setupState: {},
      exposed: {},
      slots: {},
      parent,
      provides: parent ? parent.provides : /* @__PURE__ */ Object.create(null)
    };
    return instance2;
  }
  function initProps(instance2, userProps) {
    const attrs = {};
    const props = {};
    const options = instance2.propsOptions || {};
    if (userProps) {
      for (let key in userProps) {
        const value = userProps[key];
        if (key in options) {
          props[key] = value;
        } else {
          attrs[key] = value;
        }
      }
    }
    instance2.attrs = attrs;
    instance2.props = reactive(props);
  }
  var publicProperties = {
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots
  };
  var instanceProxy = {
    get(target, key, receiver) {
      const { data, props, setupState } = target;
      if (data && hasOwn(data, key)) {
        return data[key];
      } else if (setupState && hasOwn(setupState, key)) {
        return setupState[key];
      } else if (props && hasOwn(props, key)) {
        return props[key];
      }
      let getter = publicProperties[key];
      return getter(target);
    },
    set(target, key, value, receiver) {
      const { data, props, setupState } = target;
      if (data && hasOwn(data, key)) {
        data[key] = value;
      } else if (setupState && hasOwn(setupState, key)) {
        setupState[key] = value;
      } else if (props && hasOwn(props, key)) {
        console.warn("props not update");
        return false;
      }
      return true;
    }
  };
  function initSlots(instance2, children) {
    if (instance2.vnode.shapeFlag & 32 /* SLOTS_CHILDREN */) {
      instance2.slots = children;
    }
  }
  function setupComponent(instance2) {
    const { props, type, children } = instance2.vnode;
    let { data, setup, render: render2 } = type;
    initProps(instance2, props);
    initSlots(instance2, children);
    instance2.proxy = new Proxy(instance2, instanceProxy);
    if (data) {
      if (!isFunction(data)) {
        return console.warn("The data option must be a function");
      }
      instance2.data = reactive(data.call(instance2.proxy));
    }
    if (setup) {
      const context = {
        emit: (eventName, ...args) => {
          const name = `on${eventName[0].toUpperCase()}${eventName.slice(
            1
          )}`;
          let invoker = instance2.vnode.props[name];
          invoker && invoker(...args);
        },
        attrs: instance2.attrs,
        slots: instance2.slots,
        exposed: (exposed) => {
          instance2.exposed = exposed || {};
        }
      };
      setCurrentInstance(instance2);
      const setupResult = setup(instance2.props, context);
      setCurrentInstance(null);
      if (isFunction(setupResult)) {
        instance2.render = setupResult;
      } else if (isObject(setupResult)) {
        instance2.setupState = proxyRefs(setupResult);
      }
    }
    if (!instance2.render) {
      if (render2) {
        instance2.render = render2;
      }
    }
  }

  // packages/runtime-core/src/scheduler.ts
  var queue = [];
  var isFlushing = false;
  var resolvePromise = Promise.resolve();
  function queueJob(job) {
    if (!queue.includes(job)) {
      queue.push(job);
    }
    if (!isFlushing) {
      isFlushing = true;
      resolvePromise.then(() => {
        isFlushing = false;
        let copyQueue = queue.slice(0);
        queue.length = 0;
        for (let i = 0; i < copyQueue.length; i++) {
          let job2 = copyQueue[i];
          job2();
        }
        copyQueue.length = 0;
      });
    }
  }

  // packages/runtime-core/src/renderer.ts
  function isSameVnode(v1, v2) {
    return v1.type === v2.type && v1.key === v2.key;
  }
  function createRenderer(options) {
    let {
      createElement: hostCreateElement,
      createTextNode: hostCreateTextNode,
      insert: hostInsert,
      remove: hostRemove,
      querySelector: hostQuerySelector,
      parentNode: hostParentNode,
      nextSibling: hostNextSibling,
      setText: hostSetText,
      setElementText: hostSetElementText,
      patchProp: hostPatchProp
    } = options;
    function normalize(children, i) {
      if (isString(children[i]) || isNumber(children[i])) {
        children[i] = createVNode(Text, null, children[i]);
      }
      return children[i];
    }
    function mountChildren(children, container, parent) {
      for (let i = 0; i < children.length; i++) {
        let child = normalize(children, i);
        patch(null, child, container, parent);
      }
    }
    function pathProps(oldProps, newProps, el) {
      if (oldProps == null)
        oldProps = {};
      if (newProps == null)
        newProps = {};
      for (let key in newProps) {
        hostPatchProp(el, key, oldProps[key], newProps[key]);
      }
      for (let key in oldProps) {
        if (newProps[key] == null) {
          hostPatchProp(el, key, oldProps[key], null);
        }
      }
    }
    function mountElement(vnode, container, anchor, parent) {
      const { type, props, children, shapeFlag } = vnode;
      const el = vnode.el = hostCreateElement(type);
      if (props) {
        for (let key in props) {
          pathProps(void 0, props, el);
        }
      }
      if (children) {
        if (shapeFlag & 8 /* TEXT_CHILDREN */) {
          hostSetElementText(el, children);
        }
        if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
          mountChildren(children, el, parent);
        }
      }
      hostInsert(el, container, anchor);
    }
    const processText = (n1, n2, el) => {
      if (n1 == null) {
        hostInsert(n2.el = hostCreateTextNode(n2.children), el);
      } else {
        let el2 = n2.el = n1.el;
        if (n1.children === n2.children) {
          return;
        }
        hostSetText(el2, n2.children);
      }
    };
    function unmountChildren(children, parent) {
      children.forEach((child) => {
        unmount(child, parent);
      });
    }
    function patchKeydChildren(c1, c2, el) {
      var _a;
      let i = 0;
      let e1 = c1.length - 1;
      let e2 = c2.length - 1;
      while (i <= e1 && i <= e2) {
        const n1 = c1[i];
        const n2 = c2[i];
        if (isSameVnode(n1, n2)) {
          patch(n1, n2, el);
        } else {
          break;
        }
        i++;
      }
      while (i <= e1 && i <= e2) {
        const n1 = c1[e1];
        const n2 = c2[e2];
        if (isSameVnode(n1, n2)) {
          patch(n1, n2, el);
        } else {
          break;
        }
        e1--;
        e2--;
      }
      if (i > e1) {
        while (i <= e2) {
          const nextPos = e2 + 1;
          const anchor = (_a = c2[nextPos]) == null ? void 0 : _a.el;
          patch(null, c2[i], el, anchor);
          i++;
        }
      } else if (i > e2) {
        while (i <= e1) {
          unmount(c1[i]);
          i++;
        }
      } else {
        let s1 = i;
        let s2 = i;
        const keyToNewIndexMap = /* @__PURE__ */ new Map();
        const toBePatched = e2 - s2 + 1;
        for (let i2 = s2; i2 <= e2; i2++) {
          keyToNewIndexMap.set(c2[i2].key, i2);
        }
        const seq = new Array(toBePatched).fill(0);
        for (let i2 = s1; i2 <= e1; i2++) {
          const vnode = c1[i2];
          let newIndex = keyToNewIndexMap.get(vnode.key);
          if (newIndex == void 0) {
            unmount(vnode);
          } else {
            seq[newIndex - s2] = i2 + 1;
            patch(vnode, c2[newIndex], el);
          }
        }
        let incr = getSequence(seq);
        let j = incr.length - 1;
        for (let i2 = toBePatched - 1; i2 >= 0; i2--) {
          const currentIndex = s2 + i2;
          const child = c2[currentIndex];
          const anchor = currentIndex + 1 < c2.length ? c2[currentIndex + 1].el : null;
          if (seq[i2] == 0) {
            patch(null, child, el, anchor);
          } else {
            if (i2 !== incr[j]) {
              hostInsert(child.el, el, anchor);
            } else {
              j--;
            }
          }
        }
      }
    }
    function patchChildren(n1, n2, el, parent) {
      let c1 = n1.children;
      let c2 = n2.children;
      const prevShapeFlag = n1.shapeFlag;
      const shapeFlag = n2.shapeFlag;
      if (shapeFlag & 8 /* TEXT_CHILDREN */) {
        if (prevShapeFlag & 16 /* ARRAY_CHILDREN */) {
          unmountChildren(c1, parent);
        }
        if (c1 !== c2) {
          hostSetElementText(el, c2);
        }
      } else {
        if (prevShapeFlag & 16 /* ARRAY_CHILDREN */) {
          if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
            patchKeydChildren(c1, c2, el);
          } else {
            unmountChildren(c1, parent);
          }
        } else {
          if (prevShapeFlag & 8 /* TEXT_CHILDREN */) {
            hostSetElementText(el, "");
          }
          if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
            mountChildren(c2, el, parent);
          }
        }
      }
    }
    function patchElement(n1, n2, parent) {
      let el = n2.el = n1.el;
      let oldProps = n1.props;
      let newProps = n2.props;
      pathProps(oldProps, newProps, el);
      patchChildren(n1, n2, el, parent);
    }
    const processElement = (n1, n2, container, anchor, parent) => {
      if (n1 == null) {
        mountElement(n2, container, anchor, parent);
      } else {
        patchElement(n1, n2, parent);
      }
    };
    const processFragment = (n1, n2, el, parent) => {
      if (n1 == null) {
        mountChildren(n2.children, el, parent);
      } else {
        patchKeydChildren(n1.children, n2.children, el);
      }
    };
    const hasChanged = (oldProps = {}, newProps = {}) => {
      let oldKeys = Object.keys(oldProps);
      let newKeys = Object.keys(newProps);
      if (oldKeys.length !== newKeys.length) {
        return true;
      }
      for (let i = 0; i < newKeys.length; i++) {
        const key = newKeys[i];
        if (newProps[key] !== oldProps[key]) {
          return true;
        }
      }
      return false;
    };
    function shouldComponentUpdate(n1, n2) {
      const oldProps = n1.props;
      const newProps = n2.props;
      if (n1.children || n2.children)
        return true;
      if (oldProps == newProps)
        return false;
      return hasChanged(oldProps, newProps);
    }
    function updateProps(instance2, nextProps) {
      let prevProps = instance2.props;
      for (let key in nextProps) {
        prevProps[key] = nextProps[key];
      }
      for (let key in prevProps) {
        if (!(key in nextProps)) {
          delete prevProps[key];
        }
      }
    }
    const updateComponent = (n1, n2, el, anchor) => {
      const instance2 = n2.component = n1.component;
      if (shouldComponentUpdate(n1, n2)) {
        instance2.next = n2;
        instance2.update();
      }
    };
    function unmount(vnode, parent = null) {
      const { shapeFlag, type, children, component } = vnode;
      if (type === Fragment) {
        return unmountChildren(children, parent);
      }
      if (shapeFlag & 6 /* COMPONENT */) {
        let { subTree, bum, um } = vnode.component;
        bum && invokerFns(bum);
        unmount(subTree, parent);
        um && invokerFns(um);
        return;
      }
      hostRemove(vnode.el);
    }
    function updateComponentPreRender(instance2, next) {
      instance2.next = null;
      instance2.vnode = next;
      updateProps(instance2, next.props);
      Object.assign(instance2.slots, next.children);
    }
    function setupRendererEffect(instance2, container, anchor) {
      const componentUpdate = () => {
        const { render: render3, data } = instance2;
        if (!instance2.isMounted) {
          let { bm, m, vnode } = instance2;
          if (bm) {
            invokerFns(bm);
          }
          const subTree = render3.call(instance2.proxy);
          patch(null, subTree, container, anchor, instance2);
          instance2.subTree = subTree;
          instance2.isMounted = true;
          if (m) {
            invokerFns(m);
          }
        } else {
          let next = instance2.next;
          if (next) {
            updateComponentPreRender(instance2, next);
          }
          const subTree = render3.call(instance2.proxy);
          patch(instance2.subTree, subTree, container, anchor, instance2);
          if (instance2.u) {
            invokerFns(instance2.u);
          }
          instance2.subTree = subTree;
        }
      };
      const effect2 = new ReactiveEffect(
        componentUpdate,
        () => queueJob(instance2.update)
      );
      let update = instance2.update = effect2.run.bind(effect2);
      update();
    }
    const mountComponent = (vnode, container, anchor, parent) => {
      const instance2 = vnode.component = createComponentInstance(
        vnode,
        parent
      );
      instance2.ctx.renderer = {
        createElement: hostCreateElement,
        move(vnode2, container2) {
          hostInsert(vnode2.component.subTree.el, container2);
        },
        unmount
      };
      setupComponent(instance2);
      setupRendererEffect(instance2, container, anchor);
    };
    const processComponent = (n1, n2, el, anchor, parent) => {
      if (n1 == null) {
        mountComponent(n2, el, anchor, parent);
      } else {
        updateComponent(n1, n2, el, anchor);
      }
    };
    function patch(n1, n2, container, anchor = null, parentComponent = null) {
      if (n1 && !isSameVnode(n1, n2)) {
        unmount(n1, parentComponent);
        n1 = null;
      }
      const { type, shapeFlag } = n2;
      switch (type) {
        case Text:
          processText(n1, n2, container);
          break;
        case Fragment:
          processFragment(n1, n2, container, parentComponent);
        default:
          if (shapeFlag & 1 /* ELEMENT */) {
            processElement(n1, n2, container, anchor, parentComponent);
          } else if (shapeFlag & 6 /* COMPONENT */) {
            processComponent(n1, n2, container, anchor, parentComponent);
          }
      }
    }
    function render2(vnode, container) {
      if (vnode == null) {
        if (container._vnode) {
          unmount(container._vnode);
        }
      } else {
        patch(container._vnode || null, vnode, container);
      }
      container._vnode = vnode;
    }
    return {
      render: render2
    };
  }

  // packages/runtime-core/src/apiLifeCycle.ts
  var LifeCycle = /* @__PURE__ */ ((LifeCycle2) => {
    LifeCycle2["BEFORE_MOUNT"] = "bm";
    LifeCycle2["MOUNTED"] = "m";
    LifeCycle2["BFORE_UPDATE"] = "bu";
    LifeCycle2["UPDATED"] = "u";
    LifeCycle2["BEFORE_UNMOUNT"] = "bum";
    LifeCycle2["UNMOUNTED"] = "um";
    return LifeCycle2;
  })(LifeCycle || {});
  function createInvoker2(type) {
    return function(hook, currentInstance = instance) {
      if (currentInstance) {
        const hooks = currentInstance[type] || (currentInstance[type] = []);
        hooks.push(() => {
          setCurrentInstance(currentInstance);
          hook();
          setCurrentInstance(null);
        });
      }
    };
  }
  var onBeforeMount = createInvoker2("bm" /* BEFORE_MOUNT */);
  var onMounted = createInvoker2("m" /* MOUNTED */);
  var onBeforeUpdate = createInvoker2("bu" /* BFORE_UPDATE */);
  var onUpdated = createInvoker2("u" /* UPDATED */);
  var onBeforeUnmount = createInvoker2("bum" /* BEFORE_UNMOUNT */);
  var onUnmounted = createInvoker2("um" /* UNMOUNTED */);

  // packages/runtime-core/src/apiInject.ts
  function provide(key, value) {
    if (!instance)
      return;
    let parentprovides = instance.parent && instance.parent.provides;
    let currentProvides = instance.provides;
    if (parentprovides === currentProvides) {
      currentProvides = instance.provides = Object.create(parentprovides);
    }
    instance.provides[key] = value;
  }
  var inject = (key, defaultVal) => {
    if (!instance) {
      return;
    }
    const provides = instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else {
      return defaultVal;
    }
  };

  // packages/runtime-core/src/defineAsyncComponent.ts
  function defineAsyncComponent(loaderOPtions) {
    if (typeof loaderOPtions == "function") {
      loaderOPtions = {
        loader: loaderOPtions
      };
    }
    let Component = null;
    return {
      setup() {
        const {
          loader,
          timeout,
          errorComponent,
          delay,
          loadingComponent,
          onError
        } = loaderOPtions;
        const loaded = ref(false);
        const error = ref(false);
        const loading = ref(false);
        if (timeout) {
          setTimeout(() => {
            error.value = true;
          }, timeout);
        }
        if (delay) {
          setTimeout(() => {
            loading.value = true;
          }, timeout);
        } else {
          loading.value = true;
        }
        function load() {
          return loader().catch((err) => {
            if (onError) {
              return new Promise((resolve, reject) => {
                const retry = () => resolve(load());
                const fail = (err2) => {
                  reject(err2);
                };
                onError(err, retry, fail, ++attempts);
              });
            }
          });
        }
        let attempts = 0;
        load().then((v) => {
          loaded.value = true;
          Component = v;
        }).catch((err) => {
          error.value = true;
        }).finally(() => {
          loading.value = false;
        });
        return () => {
          if (loaded.value) {
            return h(Component);
          } else if (error.value && errorComponent) {
            return h(errorComponent);
          } else if (loading.value && loadingComponent) {
            return h(loadingComponent);
          } else {
            return h(Fragment, []);
          }
        };
      }
    };
  }

  // packages/runtime-core/src/keepAlive.ts
  var KeepAlive = {
    __iskeepAlive: true,
    setup(props, { slots }) {
      const keys = /* @__PURE__ */ new Set();
      const cache = /* @__PURE__ */ new Map();
      const instance2 = getCurrentInstance();
      let pendingCacheKey = null;
      onMounted(() => {
        cache.set(pendingCacheKey, instance2.subTree);
      });
      return () => {
        let vnode = slots.default();
        if (!(vnode.shapeFlag && 4 /* STATEFUL_COMPONENT */)) {
          return vnode;
        }
        let comp = vnode.type;
        const key = vnode.key == null ? comp : vnode.key;
        pendingCacheKey = key;
        let cacheVnode = cache.get(key);
        if (cacheVnode) {
        } else {
          keys.add(key);
        }
        return vnode;
      };
    }
  };

  // packages/runtime-dom/src/index.ts
  var renderOptions = Object.assign(nodeOps, { patchProp });
  function render(vnode, container) {
    let { render: render2 } = createRenderer(renderOptions);
    return render2(vnode, container);
  }
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=runtime-dom.global.js.map
