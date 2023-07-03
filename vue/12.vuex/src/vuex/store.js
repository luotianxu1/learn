import applyMixin from './mixin'

export let Vue

// 容器的初始化
export class Store {
    constructor(options) {
        const state = options.state

        // 1、添加状态逻辑
        this._vm = new Vue({
            // 属性如果是通过$开头都 默认不会将这个属性挂载到vm上
            data: {
                $$state: state, // 会将$$state对应的对象都通过defineProperty来进行属性劫持
            },
        })
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
