import { initGlobalApi } from './global-api/index'
import { initMixin } from './init'
import { lifecycleMixin } from './lifecycle'
import { stateMixin } from './state'
import { renderMixin } from './vdom/index'

function Vue(options) {
    this._init(options) // 入口方法，做初始化操作
}

// 写成一个个的插件进行对原型的扩展
initMixin(Vue)
// 混合生命周期 组件挂载、组件更新
lifecycleMixin(Vue)
// _render
renderMixin(Vue)
stateMixin(Vue)

initGlobalApi(Vue)

export default Vue
