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

// 为了看到diff的整个流程，创建两个虚拟节点来进行比对操作
let vm1 = new Vue({
    data: {
        name: 'zf',
    },
})
import { compileToFunctions } from './compiler/index'
import { createElm, patch } from './vdom/patch'
let render1 = compileToFunctions(
    `<div>
        <li style="background:red">A</li>
        <li style="background:yellow">B</li>
        <li style="background:pink">C</li>
        <li style="background:green">D</li>
    </div>`
)
let vnode1 = render1.call(vm1) // render方法返回虚拟dom
document.body.appendChild(createElm(vnode1))

let vm2 = new Vue({
    data: {
        name: 'jw',
    },
})
let render2 = compileToFunctions(
    `<div>
        <li style="background:red">A</li>
        <li style="background:yellow">B</li>
        <li style="background:pink">C</li>
        <li style="background:green">D</li>
        <li style="background:blue">E</li>
    </div>`
)
let vnode2 = render2.call(vm2) // render方法返回虚拟dom

setTimeout(() => {
    patch(vnode1, vnode2) // 传入新的虚拟节点和老的对比
}, 3000)

export default Vue
