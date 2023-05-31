import { compileToFunctions } from './compiler/index'
import { mountComponent } from './lifecycle'
import { initState } from './state'

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this
        vm.$options = options

        // 对数据进行初始化
        initState(vm)

        // 如果当前有el属性说明要渲染模板
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }

    // 1、render 2、template 3、外部template
    Vue.prototype.$mount = function (el) {
        // 挂载操作
        const vm = this
        const options = vm.$options
        el = document.querySelector(el)
        vm.$el = el

        if (!options.render) {
            //没有render 将template转换成render方法
            let template = options.template
            if (!template && el) {
                template = el.outerHTML
            }
            // 编译原理 将模板编译成render函数
            const render = compileToFunctions(template)
            options.render = render
        }
        // console.log(options.render) // 渲染时用的都是这个render方法
        // 有render方法

        // 需要挂载这个组件
        mountComponent(vm, el)
    }
}
