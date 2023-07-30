import { isObject } from '@vue/shared'

const reactiveMap = new WeakMap() // key必须是对象

const enum ReactiveFlags {
    IS_REACTIVE = '_v_isReactive',
}

export function reactive(target) {
    if (!isObject(target)) {
        return target
    }

    if (target[ReactiveFlags.IS_REACTIVE]) {
        return target
    }

    const existing = reactiveMap.get(target)
    if (existing) {
        return existing
    }

    // es6中的proxy
    const proxy = new Proxy(target, {
        get(target, key, receiver) {
            if (key === ReactiveFlags.IS_REACTIVE) {
                return true
            }
            console.log('这里可以记录这个属性使用了哪个effect')
            return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver) {
            console.log('这里可以通知effect重新执行')
            target[key] = value
            return Reflect.set(target, key, value, receiver)
        },
    })

    reactiveMap.set(target, proxy)
    return proxy
}
