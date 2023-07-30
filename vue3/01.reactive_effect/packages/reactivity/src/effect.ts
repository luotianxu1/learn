// 依赖收集的原理是借助js是单线程的特点， 默认调用effect的时候回去调用proxy的get，此时让属性记住依赖的effect，同时也让effect记住对应的属性
// 考的是数据结构：{map:{key:new Set()}}
// 稍后数据变化的时候找到对应的map通过属性触发effect

export let activeEffect = undefined

export class ReactiveEffect {
    public active = true
    public parent = null
    public deps = [] // effect中用了哪些属性，后续清理时要使用

    // 传递的fn会放到this上
    constructor(public fn) {}

    // effectScope 可以实现让所有的effect失效
    run() {
        // 依赖收集 让属性和effect产生关联
        if (!this.active) {
            return this.fn()
        } else {
            try {
                this.parent = activeEffect
                activeEffect = this
                this.fn() // 去proxy对象是给你取值，取值的时候，我要让这个熟悉和当前的effect函数关联起来，稍后数据变化了，可以重新执行effect函数
            } finally {
                // 取消当前正在运行的effect
                activeEffect = this.parent
                this.parent = null
            }
        }
    }
}

// 哪个对戏那个中的哪个属性，对应哪个effect  一个属性可以对应多个effect
// 外层用一个map{object:{name:[effect,effect],age: [effect,effect]}}
const targetMap = new WeakMap()
export function trigger(target, key, value) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        return // 属性没有依赖任何的effect
    }

    const effects = depsMap.get(key)
    effects &&
        effects.forEach((effect) => {
            if (effect !== activeEffect) {
                effect.run() // 重新执行effect
            }
        })
}

export function track(target, key) {
    if (activeEffect) {
        // 这里搞依赖收集
        let depsMap = targetMap.get(target)
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()))
        }
        let deps = depsMap.get(key)
        if (!deps) {
            depsMap.set(key, (deps = new Set()))
        }
        let shouldTrack = !deps.has(activeEffect)
        if (shouldTrack) {
            deps.add(activeEffect)
            activeEffect.deps.push(deps)
        }
    }
    // 让属性记录所用到的effect是谁 哪个effect对应哪些属性
    console.log(activeEffect, targetMap)
}

export function effect(fn) {
    // 将用户传递的函数变成响应式的effect
    const _effect = new ReactiveEffect(fn)
    _effect.run()
}
