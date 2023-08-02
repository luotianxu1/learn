import { isObject } from '@vue/shared'
import { track, trigger } from './effect'
import { reactive } from './reactive'

export const enum ReactiveFlags {
    IS_REACTIVE = '_v_isReactive',
}

export const baseHandler = {
    get(target, key, receiver) {
        if (key === ReactiveFlags.IS_REACTIVE) {
            return true
        }
        // 让当前的key和effect关联起来

        track(target, key)

        let res = Reflect.get(target, key, receiver)
        if (isObject(res)) {
            return reactive(res)
        }

        // console.log('这里可以记录这个属性使用了哪个effect')
        return res
    },
    set(target, key, value, receiver) {
        // console.log('这里可以通知effect重新执行')
        // 数据变化后，要根据属性找到对应的effect列表让其依次更新
        let oldValue = target[key]
        if (oldValue !== value) {
            let result = Reflect.set(target, key, value, receiver)
            trigger(target, key, value)
            return result
        }
    },
}
