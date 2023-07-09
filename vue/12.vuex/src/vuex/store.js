import store from '@/store'
import applyMixin from './mixin'
import { forEachVal } from './utils'
import ModuleCollection from './module/module-collection'

export let Vue

function getNewState(store, path) {
    return path.reduce((memo, current) => {
        return memo[current]
    }, store.state)
}

/**
 *
 * @param {*} store 容器
 * @param {*} rootStore 根模块
 * @param {*} path 所有路径
 * @param {*} module 格式化后的结果
 */
const installModule = (store, rootStore, path, module) => {
    // 获取moduleCollection类的实例
    let ns = store._modules.getNamespace(path)

    if (path.length > 0) {
        // 儿子模块
        // 需要找到对应父模块，将状态声明上去
        // {name:'zf',age:'12',a:aState}
        let parent = path.slice(0, -1).reduce((memo, current) => {
            return memo[current]
        }, rootStore)
        // 对象新增属性不能导致重新更新视图
        Vue.set(parent, path[path.length - 1], module.state)
    }

    // 这里要对当前模块进行操作
    module.forEachMutation((mutation, key) => {
        store._mutations[ns + key] = store._mutations[ns + key] || []
        store._mutations[ns + key].push((payload) => {
            mutation.call(store, getNewState(store, path), payload)
            store._subscribes.forEach((fn) =>
                fn({ type: ns + key, payload }, store.state)
            )
        })
    })
    module.forEachAction((action, key) => {
        store._actions[ns + key] = store._actions[ns + key] || []
        store._actions[ns + key].push((payload) => {
            action.call(store, store, payload)
        })
    })
    module.forEachGetter((getter, key) => {
        // 模块中getter的名字重复来会覆盖
        store._wrappedGetters[ns + key] = function () {
            return getter(getNewState(store, path))
        }
    })
    module.forEachChild((child, key) => {
        installModule(store, rootStore, path.concat(key), child)
    })
}

function resetStoreVM(store, state) {
    store.getters = {}
    const computed = {}
    forEachVal(store._wrappedGetters, (fn, key) => {
        computed[key] = () => {
            return fn()
        }
        Object.defineProperty(store.getters, key, {
            get: () => {
                store._vm[key]
            },
        })
    })
    store._vm = new Vue({
        data: {
            $$state: state,
        },
        computed,
    })
}

// 容器的初始化
export class Store {
    constructor(options) {
        const state = options.state

        this._mutations = {}
        this._actions = {}
        this._wrappedGetters = {}
        this._subscribes = []
        this._committing = false // 默认不是在mutation中更改的

        // 1、模块收集
        this._modules = new ModuleCollection(options)

        // 安装模块
        installModule(this, state, [], this._modules.root)

        resetStoreVM(this, state)

        if (options.plugins) {
            // 说明用户使用了插件
            options.plugins.forEach((plugin) => plugin(this))
        }
    }

    _withCommittting(fn) {
        this._committing = true // 如果true
        fn() // 函数是同步的 获取_commiting 就是true,如果是异步的那么就会变成false 就会打印日志
        this._committing = false
    }

    subscribe(fn) {
        this._subscribes.push(fn)
    }

    replaceState(newState) {
        // 需要替换的状态
        this._withCommittting(() => {
            this._vm._data.$$state = newState // 替换最新的状态， 赋予对象类型会被重新劫持
        })
        // 虽然替换了状态，但是mutation getter中的state在初始化的时候 已经被绑定死了老的状态
    }

    // 在严格模式下mutations和actions是有区别的
    // 保证当前this指向当前实例
    commit = (type, payload) => {
        // 调用commit 就是去找刚才绑定好的mutations
        this._mutations[type] &&
            this._mutations[type].forEach((fn) => fn(payload))
    }

    dispatch = (type, payload) => {
        this._actions[type] && this._actions[type].forEach((fn) => fn(payload))
    }

    // 属性访问器
    get state() {
        return this._vm._data.$$state
    }
}

// 插件的安装
export const install = (_Vue) => {
    Vue = _Vue

    // 需要将跟组件中注入的store 分派给每一个组件
    applyMixin(Vue)
}
