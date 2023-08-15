import { isFunction } from '@vue/shared'
import { proxyRefs, reactive } from '@vue/reactivity'

export function createComponentInstance(vnode) {
    const instance = {
        state: {},
        isMounted: false, // 默认组件没有初始化，初始化后会将此属性isMounted true
        subTree: null, // 要渲染的子树的虚拟节点
        vnode: vnode, // 组件的虚拟节点
        update: null,
        attrs: {},
        props: {},
        propsOptions: vnode.type.props || {}, // 组件中接受的属性
        proxy: null,
        render: null,
        setupState: {},
        exposed: {},
    } // 此实例就是用来继续组件的属性的，相关信息的
    return instance
}

export function setupComponent(instance) {
    const { props, type } = instance.vnode // 组件的虚拟节点
    let { data, setup, render } = type
    if (data) {
        if (!isFunction(data)) {
            return console.warn('The data option must be a function')
        }
        // 给实例赋予data
        instance.data = reactive(data.call(instance.proxy))
    }
    instance.render = render
}
