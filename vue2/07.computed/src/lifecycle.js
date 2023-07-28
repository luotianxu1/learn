import Watcher from './observer/watcher'
import { patch } from './vdom/patch'

export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        const vm = this
        // 这里需要区分下到底是首次渲染还是更新
        const prevVnode = vm._vnode
        if (!prevVnode) {
            // 用新的创建的元素，替换老的vm.$el
            vm.$el = patch(vm.$el, vnode)
        } else {
            vm.$el = patch(prevVnode, vnode)
        }
        vm._vnode = vnode
    }
}

export function mountComponent(vm, el) {
    // 调用render方法去渲染el属性
    // 先调用render方法创建虚拟节点，再将虚拟节点渲染到页面上
    callHook(vm, 'beforeMount')

    let updateComponent = () => {
        vm._update(vm._render())
    }
    // 这个watcher是用于渲染的，目前没有任何功能
    new Watcher(
        vm,
        updateComponent,
        () => {
            callHook(vm, 'updated')
        },
        true
    )

    callHook(vm, 'mounted')
}

export function callHook(vm, hook) {
    let handlers = vm.$options[hook]
    if (handlers) {
        for (let i = 0; i < handlers.length; i++) {
            handlers[i].call(vm)
        }
    }
}
