// 依赖收集的原理是借助js是单线程的特点， 默认调用effect的时候回去调用proxy的get，此时让属性记住依赖的effect，同时也让effect记住对应的属性
// 考的是数据结构：{map:{key:new Set()}}
// 稍后数据变化的时候找到对应的map通过属性触发effect

export let activeEffect = undefined

function cleanEffect(effect) {
    // 需要清理effect中存入属性中的set中的effect
    // 每次执行前都需要将effect只对应属性的set集合都清理掉
    let deps = effect.deps
    for (let i = 0; i < deps.length; i++) {
        deps[i].delete(effect)
    }
    effect.deps.length = 0
}

export class ReactiveEffect {
    public active = true
    public parent = null
    public deps = [] // effect中用了哪些属性，后续清理时要使用

    // 传递的fn会放到this上
    constructor(public fn, public scheduler?) {}

    // effectScope 可以实现让所有的effect失效
    run() {
        // 依赖收集 让属性和effect产生关联
        if (!this.active) {
            return this.fn()
        } else {
            try {
                this.parent = activeEffect
                activeEffect = this
                cleanEffect(this)
                return this.fn() // 去proxy对象是给你取值，取值的时候，我要让这个熟悉和当前的effect函数关联起来，稍后数据变化了，可以重新执行effect函数
            } finally {
                // 取消当前正在运行的effect
                activeEffect = this.parent
                this.parent = null
            }
        }
    }

    stop() {
        if (this.active) {
            this.active = false
            cleanEffect(this)
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

    let effects = depsMap.get(key)
    triggerEffects(effects)
}

export function triggerEffects(effects) {
    if (effects) {
        effects = new Set(effects)
        effects.forEach((effect) => {
            if (effect !== activeEffect) {
                if (effect.scheduler) {
                    effect.scheduler()
                } else {
                    effect.run() // 重新执行effect
                }
            }
        })
    }
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
        trackEffects(deps)
    }
    // 让属性记录所用到的effect是谁 哪个effect对应哪些属性
}

export function trackEffects(deps) {
    let shouldTrack = !deps.has(activeEffect)
    if (shouldTrack) {
        deps.add(activeEffect)
        activeEffect.deps.push(deps)
    }
}

export function effect(fn, options = {} as any) {
    // 将用户传递的函数变成响应式的effect
    const _effect = new ReactiveEffect(fn, options.scheduler)
    _effect.run()
    const runner = _effect.run.bind(_effect)
    runner.effect = _effect // 暴露effect实例
    return runner // 用户可以手动调用runner重新执行
}
