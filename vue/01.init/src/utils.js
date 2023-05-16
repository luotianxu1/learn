export function isFunction(val) {
    return typeof val === 'function'
}

export function isObject(val) {
    return typeof val == 'object' && val !== null
}

// 代理
export function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key]
        },
        set(newValue) {
            vm[source][key] = newValue
        },
    })
}

export function defineProperty(target, key, value) {
    Object.defineProperty(target, key, {
        enumerable: false, // 不能被枚举
        configurable: false,
        value,
    })
}
