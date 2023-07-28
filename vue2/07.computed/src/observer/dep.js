let id = 0
class Dep {
    constructor() {
        this.subs = [] // 用来存放watcher的
        this.id = id++
    }
    depend() {
        Dep.target.addDep(this) // 实现双向记忆，让watcher记住dep的同时，让dep也记住wathcer
    }
    addSub(watcher) {
        this.subs.push(watcher)
    }
    notify() {
        this.subs.forEach((watcher) => watcher.update())
    }
}

Dep.target = null
let stack = []
export function pushTarget(watcher) {
    Dep.target = watcher
    stack.push(watcher)
}

export function popTarget() {
    Dep.target = stack[stack.length - 1]
}

export default Dep

// 多对多的关系 一个属性有一个dep，dep是用来收集watcher的
// dep可以存多个watcher
// 1个watcher可以对应多个dep
