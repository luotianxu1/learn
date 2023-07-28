import { mergeOptions } from '../utils'

export function initGlobalApi(Vue) {
    Vue.options = {} // 用来存放全局的配置 , 每个组件初始化的时候都会和options选项进行合并
    Vue.mixin = function (options) {
        // 合并对象 先考虑生命周期，先不考虑其他的合并
        this.options = mergeOptions(this.options, options)
        return this
    }
}
