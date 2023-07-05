import store from '@/store'
import applyMixin from './mixin'
import { forEachVal } from './utils'
import ModuleCollection from './module/module-collection'

export let Vue

/**
 *
 * @param {*} store 容器
 * @param {*} rootStore 根模块
 * @param {*} path 所有路径
 * @param {*} module 格式化后的结果
 */
const installModule = (store, rootStore, path, module) => {
    // 这里要对当前模块进行操作
    module.forEachMutation((mutation, key) => {
        store._mutations[key] = store._mutations[key] || []
        store._mutations[key].push((payload) => {
            mutation.call(store, module.state, payload)
        })
    })
    module.forEachAction((action, key) => {
        store._actions[key] = store._actions[key] || []
        store._actions[key].push((payload) => {
            action.call(store, store, payload)
        })
    })
    module.forEachGetter((getter, key) => {
        // 模块中getter的名字重复来会覆盖
        store._wrappedGetters[key] = function () {
            return getter(module.state)
        }
    })
    module.forEachChild((child, key) => {
        installModule(store, rootStore, path.concat(key), child)
    })
}

// 容器的初始化
export class Store {
    constructor(options) {
        const state = options.state

        this._mutations = {}
        this._actions = {}
        this._wrappedGetters = {}

        // 1、模块收集
        this._modules = new ModuleCollection(options)

        installModule(this, state, [], this._modules.root)

        // 1、添加状态逻辑
        // const computed = {}

        // 2、处理getters 具有缓存的
        // this.getters = {}
        // forEachVal(options.getters, (fn, key) => {
        //     // 将用户的getters定义在实例上
        //     computed[key] = () => {
        //         return fn(this.state)
        //     }
        //     // 当我取值时执行计算属性的逻辑
        //     Object.defineProperty(this.getters, key, {
        //         get: () => this._vm[key],
        //     })
        // })

        // 3、计算属性的实现
        // this._vm = new Vue({
        //     // 属性如果是通过$开头都 默认不会将这个属性挂载到vm上
        //     data: {
        //         $$state: state, // 会将$$state对应的对象都通过defineProperty来进行属性劫持
        //     },
        //     computed,
        // })

        // 4、mutations
        // this.mutations = {}

        // forEachVal(options.mutations, (fn, key) => {
        //     this.mutations[key] = (payload) => fn(this.state, payload)
        // })

        // 5、actions
        // this.actions = {}
        // forEachVal(options.actions, (fn, key) => {
        //     this.actions[key] = (payload) => fn(this, payload)
        // })
    }

    // 在严格模式下mutations和actions是有区别的
    // 保证当前this指向当前实例
    commit = (type, payload) => {
        // 调用commit 就是去找刚才绑定好的mutations
        this.mutations[type](payload)
    }

    dispatch = (type, payload) => {
        this.actions[type](payload)
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
