import { ShapeFlags, hasOwn, isFunction, isObject } from '@vue/shared'
import { proxyRefs, reactive } from '@vue/reactivity'

export let instance = null

export function setCurrentInstance(i) {
    instance = i
}

export const getCurrentInstance = () => instance

export function createComponentInstance(vnode, parent) {
    const instance = {
        ctx: {} as any, //当前实例的上下文，用于存储信息
        state: {},
        isMounted: false, // 默认组件没有初始化，初始化后会将此属性isMounted true
        subTree: null, // 要渲染的子树的虚拟节点
        vnode: vnode, // 组件的虚拟节点
        update: null,
        attrs: {}, // 用户没有接收到属性
        props: {}, // 用户接收的属性
        propsOptions: vnode.type.props || {}, // 组件中接受的属性
        proxy: null, // 代理对象
        render: null,
        setupState: {}, // 返回的是对象则要给这个对象赋值
        exposed: {},
        slots: {}, // 存放所有插槽信息
        parent, // 标记当前组件的父亲
        provides: parent ? parent.provides : Object.create(null),
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
    $slots: (i) => i.slots,
}

const instanceProxy = {
    get(target, key, receiver) {
        const { data, props, setupState } = target
        if (data && hasOwn(data, key)) {
            return data[key]
        } else if (setupState && hasOwn(setupState, key)) {
            return setupState[key]
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
        } else if (setupState && hasOwn(setupState, key)) {
            setupState[key] = value
        } else if (props && hasOwn(props, key)) {
            console.warn('props not update')
            return false
        }
        return true
    },
}

function initSlots(instance, children) {
    if (instance.vnode.shapeFlag & ShapeFlags.SLOTS_CHILDREN) {
        instance.slots = children // 将用户的children映射到实例上
    }
}

export function setupComponent(instance) {
    const { props, type, children } = instance.vnode // 组件的虚拟节点
    let { data, setup, render } = type

    initProps(instance, props)
    initSlots(instance, children)

    instance.proxy = new Proxy(instance, instanceProxy)

    if (data) {
        if (!isFunction(data)) {
            return console.warn('The data option must be a function')
        }
        // 给实例赋予data
        instance.data = reactive(data.call(instance.proxy))
    }

    if (setup) {
        const context = {
            emit: (eventName, ...args) => {
                const name = `on${eventName[0].toUpperCase()}${eventName.slice(
                    1
                )}`
                let invoker = instance.vnode.props[name]
                invoker && invoker(...args)
            },
            attrs: instance.attrs,
            slots: instance.slots,
            exposed: (exposed) => {
                instance.exposed = exposed || {}
            },
        }
        setCurrentInstance(instance)
        // setup在执行的时候有2个参数
        const setupResult = setup(instance.props, context)
        setCurrentInstance(null)
        if (isFunction(setupResult)) {
            // 如果setup返回的是setup
            instance.render = setupResult
        } else if (isObject(setupResult)) {
            // 是数据
            instance.setupState = proxyRefs(setupResult) // 可与在去值的时候自动.value
        }
    }

    if (!instance.render) {
        if (render) {
            instance.render = render
        }
    }
    // 最终一定要获取到对应的render函数
}
