class Dep {
    constructor() {
        this.subs = [] // 用来存放watcher的
    }
    depend() {
        if (Dep.target) {
            this.subs.push(Dep.target)
        }
    }
    notify() {
        this.subs.forEach((watcher) => watcher.update())
    }
}

Dep.target = null
export function pushTarget(watcher) {
    Dep.target = watcher
}

export function popTarget() {
    Dep.target = null
}

export default Dep

// 多对多的关系 一个属性有一个dep，dep是用来收集watcher的
// dep可以存多个watcher
// 1个watcher可以对应多个dep
