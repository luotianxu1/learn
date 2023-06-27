import RouterLink from './components/link'
import RouterView from './components/view'

export let _Vue
export default function install(Vue, optinos) {
    // 插件安装入口
    _Vue = Vue // 这样别的文件都可以使用Vue变量
    Vue.mixin({
        beforeCreate() {
            // 将父亲传入的router实例共享给所有自组件
            if (this.$options.router) {
                // 根组件
                this._routerRoot = this // 给跟组件增加一个属性 指向了自己
                this._router = this.$options.router
            } else {
                // 子 孙子
                // 组件渲染是一层一层渲染
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
            // 无论是父组件还是自组件，都可以通过this._routerRoot.router获取共同的实例
        },
    })

    // 给所有组件都混入一个属性

    Vue.component('router-link', RouterLink)
    Vue.component('router-view', RouterView)

    Vue.prototype.$route = {}
    Vue.prototype.$router = {}
}
