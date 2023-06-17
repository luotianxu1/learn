import { observe } from './observer/index'
import { isFunction, nextTick, proxy } from './utils'
import Watcher from './observer/watcher'
import Dep from './observer/dep'

export function initState(vm) {
    const opts = vm.$options
    if (opts.props) {
        initProps(vm)
    }
    if (opts.methods) {
        initMethods(vm)
    }
    if (opts.data) {
        initData(vm)
    }
    if (opts.computed) {
        initComputed(vm)
    }
    if (opts.watch) {
        initWatch(vm)
    }
}

function initData(vm) {
    let data = vm.$options.data
    data = vm._data = isFunction(data) ? data.call(vm) : data

    // 用户去vm.xxx => vm._data.xxx
    for (let key in data) {
        proxy(vm, '_data', key)
    }

    // 数据劫持
    observe(vm._data)
}
function initProps(vm) {}
function initMethods(vm) {}
function initComputed(vm) {
    let computed = vm.$options.computed
    const watchers = (vm._computedWatchers = {}) // 稍后存放计算属性的
    for (let key in computed) {
        const userDef = computed[key] // 取出对应的值
        // 获取get方法
        const getter = typeof userDef == 'function' ? userDef : userDef.get // watcher使用

        watchers[key] = new Watcher(vm, getter, () => {}, { lazy: true })
        definecomputed(vm, key, userDef)
    }
}
const sharePropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: () => {},
    set: () => {},
}
function definecomputed(target, key, userDef) {
    if (typeof userDef == 'function') {
        sharePropertyDefinition.get = createComputedGetter(key)
    } else {
        sharePropertyDefinition.get = createComputedGetter(key) // 需要加缓存
        sharePropertyDefinition.set = userDef.set
    }
    Object.defineProperty(target, key, sharePropertyDefinition)
}

function createComputedGetter(key) {
    // 此方法是我们包装的方法 每次取值会调用此方法
    return function computedGetter() {
        const watcher = this._computedWatchers[key] //拿到属性对应的watcher
        if (watcher) {
            // 判断到底要不要执行用户传递的方法
            if (watcher.dirty) {
                watcher.evaluate() // 对当前的watcher求值
            }
            if (Dep.target) {
                watcher.depend()
            }
            return watcher.value // 默认返回watcher上
        }
    }
}

function initWatch(vm) {
    let watch = vm.$options.watch
    for (let key in watch) {
        const handler = watch[key] //handler可能是数组、字符串、对象、函数
        if (Array.isArray(handler)) {
            //数组
            handler.forEach((handler) => {
                createWatcher(vm, key, handler)
            })
        } else {
            createWatcher(vm, key, handler) //字符串、对象、函数
        }
    }
}

// options可以用来标识是用户watcher
function createWatcher(vm, exprOrFn, handler, options) {
    if (typeof handler == 'object') {
        options = handler
        handler = handler.handler // 是一个函数
    }
    if (typeof handler == 'string') {
        handler = vm[handler] // 将实例的方法作为handler
    }
    return vm.$watch(exprOrFn, handler, options)
}

export function stateMixin(Vue) {
    Vue.prototype.$nextTick = function (cb) {
        nextTick(cb)
    }
    Vue.prototype.$watch = function (exprOrFn, cb, options = {}) {
        // 数据应该依赖这个watcher 数据变化后应该让watcher从新执行
        // vm,name,用户回调，options.user
        new Watcher(this, exprOrFn, cb, { ...options, user: true })
        if (options.immediate) {
            cb() // 如果是immediate应该立刻执行
        }
    }
}
