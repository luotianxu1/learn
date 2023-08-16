import { hasOwn, isFunction } from '@vue/shared'
import { proxyRefs, reactive } from '@vue/reactivity'

export function createComponentInstance(vnode) {
    const instance = {
        state: {},
        isMounted: false, // 默认组件没有初始化，初始化后会将此属性isMounted true
        subTree: null, // 要渲染的子树的虚拟节点
        vnode: vnode, // 组件的虚拟节点
        update: null,
        attrs: {}, // 用户没有接收到属性
        props: {}, // 用户接收的属性
        propsOptions: vnode.type.props || {}, // 组件中接受的属性
        proxy: null,
        render: null,
        setupState: {},
        exposed: {},
    } // 此实例就是用来继续组件的属性的，相关信息的
    return instance
}

function initProps(instance, userProps) {
    const attrs = {}
    const props = {}
    const options = instance.propsOptions || {} // 组件上接受的props
    if (userProps) {
        for (let key in userProps) {
            // 属性中应该包含属性的校验
            const value = userProps[key]
            if (key in options) {
                props[key] = value
            } else {
                attrs[key] = value
            }
        }
    }
    instance.attrs = attrs // 默认是非响应式的
    instance.props = reactive(props) // 内部用的是浅响应式
}

const publicProperties = {
    $attrs: (i) => i.attrs, // proxy.$attrs().c
}

const instanceProxy = {
    get(target, key, receiver) {
        const { data, props, setupState } = target
        if (data && hasOwn(data, key)) {
            return data[key]
        } else if (props && hasOwn(props, key)) {
            return props[key]
        }
        let getter = publicProperties[key]
        return getter(target)
    },
    set(target, key, value, receiver) {
        const { data, props, setupState } = target
        if (data && hasOwn(data, key)) {
            data[key] = value
        } else if (props && hasOwn(props, key)) {
            console.warn('props not update')
            return false
        }
        return true
    },
}

export function setupComponent(instance) {
    const { props, type } = instance.vnode // 组件的虚拟节点
    let { data, setup, render } = type

    initProps(instance, props)

    instance.proxy = new Proxy(instance, instanceProxy)

    if (data) {
        if (!isFunction(data)) {
            return console.warn('The data option must be a function')
        }
        // 给实例赋予data
        instance.data = reactive(data.call(instance.proxy))
    }
    instance.render = render
}
