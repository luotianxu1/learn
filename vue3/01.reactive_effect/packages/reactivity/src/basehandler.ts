import { track, trigger } from './effect'

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

        // console.log('这里可以记录这个属性使用了哪个effect')
        return Reflect.get(target, key, receiver)
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
