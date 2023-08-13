import { isObject } from '@vue/shared'
import { trackEffects, triggerEffects } from './effect'
import { reactive } from './reactive'

export function ref(value) {
    return new RefImpl(value)
}

export function isRef(value) {
    return !!(value && value.__v_isRef)
}

export function toRef(object, key) {
    return new ObjectRefImpl(object, key)
}

export function toRefs(object) {
    let result = {}
    for (let key in object) {
        result[key] = toRef(object, key)
    }
    return result
}

export function proxyRefs(object) {
    return new Proxy(object, {
        get(target, key, receiver) {
            let r = Reflect.get(target, key, receiver)
            return isRef(r) ? r.value : r
        },
        set(target, key, value, receiver) {
            let oldValue = Reflect.get(target, key, receiver)
            if (isRef(oldValue)) {
                oldValue.value = value
                return true
            } else {
                // 其它情况下直接赋值即可
                return Reflect.set(target, key, value, receiver)
            }
        },
    })
}

export function toReactive(value) {
    return isObject(value) ? reactive(value) : value
}

class ObjectRefImpl {
    public __v_isRef = true
    constructor(public object, public key) {}
    get value() {
        return this.object[this.key]
    }
    set value(newVlaue) {
        this.object[this.key] = newVlaue
    }
}

class RefImpl {
    public _value
    public dep
    public __v_isRef = true

    constructor(public rawValue) {
        this._value = toReactive(rawValue)
    }
    get value() {
        trackEffects(this.dep || (this.dep = new Set()))
        return this._value
    }
    set value(newVal) {
        if (newVal !== this.rawValue) {
            this._value = toReactive(newVal)
            this.rawValue = newVal
            triggerEffects(this.dep)
        }
    }
}
