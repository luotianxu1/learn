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

export const lifeCycleHooks = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
]
// 策略模式
let strats = {} // 存放各种策略
strats.data = function (parentVal, childVal) {
    // 这里应该有合并策略
    return childVal
}
strats.computed = function () {}
strats.watch = function () {}

// 生命周期的合并
function mergeHook(parentVal, childVal) {
    if (childVal) {
        if (parentVal) {
            return parentVal.concat(childVal) // 后续
        } else {
            return [childVal] // 第一次
        }
    } else {
        return parentVal
    }
}
lifeCycleHooks.forEach((hook) => {
    strats[hook] = mergeHook
})

export function mergeOptions(parent, child) {
    // 遍历父亲，可能是父亲有，儿子没有
    const options = {}

    for (let key in parent) {
        // 父亲和儿子都有在这就处理了
        mergeField(key)
    }

    // 儿子有父亲没有
    for (let key in child) {
        if (parent.hasOwnProperty(key)) {
            continue
        }
        mergeField(key)
    }

    function mergeField(key) {
        let parentVal = parent[key]
        let childVal = child[key]
        // 策略模式
        if (strats[key]) {
            // 如果有对应的策略就调用对应的策略即可
            options[key] = strats[key](parentVal, childVal)
        } else {
            if (isObject(parentVal) && isObject(childVal)) {
                options[key] = { ...parentVal, ...childVal }
            } else {
                // 父亲中有，儿子中没有
                options[key] = child[key] || parent[key]
            }
        }
    }

    return options
}
