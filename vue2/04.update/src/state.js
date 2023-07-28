import { observe } from './observer/index'
import { isFunction, nextTick, proxy } from './utils'

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
function initComputed(vm) {}
function initWatch(vm) {}

export function stateMixin(Vue) {
    Vue.prototype.$nextTick = function (cb) {
        nextTick(cb)
    }
}
