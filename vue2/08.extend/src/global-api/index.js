import { mergeOptions } from '../utils'
import initExtend from './extend'

export function initGlobalApi(Vue) {
    Vue.options = {} // 用来存放全局的配置 , 每个组件初始化的时候都会和options选项进行合并

    // initMixin()
    Vue.mixin = function (options) {
        // 合并对象 先考虑生命周期，先不考虑其他的合并
        this.options = mergeOptions(this.options, options)
        return this
    }

    Vue.options._base = Vue // _base最终的Vue的构造函数保留在options对象中
    Vue.options.components = {} //全局组件

    initExtend(Vue)

    Vue.component = function (id, definition) {
        definition.name = definition.name || id // 默认会以name属性为准
        // 根据当前组件对象 生成了一个子类的构造哦函数
        // 用的时候得new definition().$mount()
        definition = this.options._base.extend(definition) // 永远是父类
        // Vue.components 注册组件 等价于Vue.options.components[id] = definition
        Vue.options.components[id] = definition
    }
}
