import { observe } from './observer/index'
import { isFunction, proxy } from './utils'

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

// 初始化data数据
function initData(vm) {
    // 实例的_data属性就是传入的data
    // vue组件data推荐使用函数 防止数据在组件之间共享
    let data = vm.$options.data
    data = vm._data = isFunction(data) ? data.call(vm) : data

    // 把data数据代理到vm 也就是Vue实例上面 我们可以使用this.a来访问this._data.a
    // 用户去vm.xxx => vm._data.xxx
    for (let key in data) {
        proxy(vm, '_data', key)
    }

    // 数据劫持 对数据进行观测 --响应式数据核心
    observe(vm._data)
}
function initProps(vm) {}
function initMethods(vm) {}
function initComputed(vm) {}
function initWatch(vm) {}
