import { isFunction } from '@vue/shared'
import {
    ReactiveEffect,
    activeEffect,
    track,
    trackEffects,
    triggerEffects,
} from './effect'

export function computed(getterOrOptions) {
    let isGetter = isFunction(getterOrOptions)

    let getter
    let setter

    const fn = () => console.warn('computed is readonly')
    if (isGetter) {
        getter = getterOrOptions
        setter = () => fn
    } else {
        getter = getterOrOptions.get
        setter = getterOrOptions.set || fn
    }

    return new ComputedRefImpl(getter, setter)
}

class ComputedRefImpl {
    private _value
    private _dirty = true
    public effect
    public deps
    public __v_isRef = true

    constructor(getter, public setter) {
        // 拿到effect实例，让函数执行
        this.effect = new ReactiveEffect(getter, () => {
            if (!this._dirty) {
                this._dirty = true
                // 通知自己收集的effect执行
                triggerEffects(this.deps)
            }
        })
    }

    get value() {
        if (activeEffect) {
            // 让计算属性做依赖收集
            trackEffects(this.deps || (this.deps = new Set()))
        }
        if (this._dirty) {
            this._dirty = false
            this._value = this.effect.run()
        }
        return this._value
    }
    set value(newValues) {
        this.setter(newValues)
    }
}
