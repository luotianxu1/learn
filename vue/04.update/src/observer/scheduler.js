import { nextTick } from '../utils'

let queue = [] // 将需要批量更新的watcher存到一个队列中，稍后让watcher执行
let has = {}
let pending = false

function flushSchedulerQueue() {
    queue.forEach((watcher) => {
        watcher.run()
        watcher.cb()
    })
    queue = [] // 清空watcher队列
    has = {} // 清空标识id
    pending = false
}

export function queueWatcher(watcher) {
    const id = watcher.id
    if (has[id] == null) {
        queue.push(watcher) // 将watcher存到队列中
        has[id] = true

        if (!pending) {
            //如果还没清空队列，就不要再开定时器
            // 等待所有同步代码执行完毕后再执行
            nextTick(flushSchedulerQueue)
            pending = true
        }
    }
}
