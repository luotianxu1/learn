import { popTarget, pushTarget } from './dep'
import { queueWatcher } from './scheduler'

let id = 0
class Watcher {
    // vm实例
    // exprOrFn vm._update(vm._render())
    constructor(vm, exprOrFn, cb, options) {
        this.vm = vm
        this.exprOrFn = exprOrFn
        this.cb = cb
        this.options = options
        this.id = id++ // watcher的唯一标识
        this.deps = [] //记录有多少dep依赖它
        this.depsId = new Set()

        if (typeof exprOrFn == 'function') {
            this.getter = exprOrFn
        }
        this.get() // 默认会调用get方法
    }
    addDep(dep) {
        let id = dep.id
        if (!this.depsId.has(id)) {
            this.deps.push(dep)
            this.depsId.add(id)
            dep.addSub(this)
        }
    }
    get() {
        pushTarget(this) // 当前watcher实例
        this.getter()
        popTarget()
    }
    run() {
        this.get()
    }
    update() {
        // 这里不要每次都调用get方法 get方法会重新渲染页面
        queueWatcher(this)
    }
}

export default Watcher

// 在数据劫持的时候给每个属性都增加了一个dep

// 1.x先把这个渲染watcher放到Dep.taeget属性上
// 2.开始渲染，取值会调用get方法，需要让这个属性的dep存储当前的watcher
// 3.页面上所需要的属性都会将这个watcher存在自己的dep中
// 4.属性更新就重新调用渲染逻辑，通知自己存储的watcher来更新
