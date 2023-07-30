import { isObject } from '@vue/shared'
import { ReactiveFlags, baseHandler } from './basehandler'

const reactiveMap = new WeakMap() // key必须是对象

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
    const proxy = new Proxy(target, baseHandler)

    reactiveMap.set(target, proxy)
    return proxy
}
