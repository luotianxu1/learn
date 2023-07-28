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
// strats.computed = function () {}
// strats.watch = function () {}

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

let callbacks = []
let pending = false

function flushCallbacks() {
    callbacks.forEach((cb) => cb()) // 让nextTick中传入的方法依次执行
    pending = false // 标识已经执行完毕
    callbacks = []
}

function timer(flushCallbacks) {
    let timerFn = () => {}
    if (Promise) {
        timerFn = () => {
            Promise.resolve().then(flushCallbacks)
        }
    } else if (MutationObserver) {
        let textNode = document.createTextNode(1)
        let observe = new MutationObserver(flushCallbacks)
        observe.observe(textNode, {
            characterData: true,
        })
        timerFn = () => {
            textNode.textContent = 3
        }
        // 微任务
    } else if (setImmediate) {
        timerFn = () => {
            setImmediate(flushCallbacks)
        }
    } else {
        timerFn = () => {
            setTimeout(flushCallbacks)
        }
    }
    timerFn()
}

export function nextTick(cb) {
    // 因为内部会调用nextTick 用户也会调用，但是异步只需要一次
    callbacks.push(cb)
    if (!pending) {
        timer(flushCallbacks) // 这个方法是异步方法 做了兼容处理
        pending = true
    }
}
