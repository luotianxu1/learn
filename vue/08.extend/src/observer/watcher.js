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
        this.isWatcher = typeof options == 'boolean' // 是否为渲染watcher
        this.user = !!options.user // 是否为用户watcher
        this.lazy = !!options.lazy // 如果watcher上有lazy属性 说明是一个计算属性
        this.dirty = options.lazy // dirty代表取值时是否执行用户提供的方法
        this.id = id++ // watcher的唯一标识
        this.deps = [] //记录有多少dep依赖它
        this.depsId = new Set()

        if (typeof exprOrFn == 'function') {
            this.getter = exprOrFn
        } else {
            // exprOrFn可能传递过来的是一个字符串
            this.getter = function () {
                // 当去当前实例上取值时，才会出发依赖收集
                // age.n  vm['age.n']  =》 vm['age']['n']
                let path = exprOrFn.split('.') // [age,n]
                let obj = vm
                for (let i = 0; i < path.length; i++) {
                    obj = obj[path[i]]
                }
                return obj
            }
        }
        // 默认会先调用一次get方法，进行取值，将结果保留下来
        this.value = this.lazy ? void 0 : this.get() // 默认会调用get方法
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
        let result = this.getter.call(this.vm) // 调用exporOrFn 渲染页面 取值（执行了get方法）
        this.getter()
        popTarget()
        return result
    }
    run() {
        let newValue = this.get()
        let oldValue = this.value
        this.value = newValue // 更新老值
        if (this.user) {
            this.cb.call(this.vm, newValue, oldValue)
        }
    }
    update() {
        if (this.lazy) {
            // 是计算属性
            this.dirty = true
        } else {
            // 这里不要每次都调用get方法 get方法会重新渲染页面
            queueWatcher(this)
        }
    }
    evaluate() {
        this.dirty = false // 　取过一次值之后就表示已经取过值了
        this.value = this.get()
    }
    depend() {
        let i = this.deps.length
        while (i--) {
            this.deps[i].depend() // 让depend存储渲染watcher
        }
    }
}

export default Watcher

// 在数据劫持的时候给每个属性都增加了一个dep

// 1.x先把这个渲染watcher放到Dep.taeget属性上
// 2.开始渲染，取值会调用get方法，需要让这个属性的dep存储当前的watcher
// 3.页面上所需要的属性都会将这个watcher存在自己的dep中
// 4.属性更新就重新调用渲染逻辑，通知自己存储的watcher来更新
