import { instance, setCurrentInstance } from './component'

export const enum LifeCycle {
    BEFORE_MOUNT = 'bm',
    MOUNTED = 'm',
    BFORE_UPDATE = 'bu',
    UPDATED = 'u',
    BEFORE_UNMOUNT = 'bum',
    UNMOUNTED = 'um',
}

function createInvoker(type) {
    return function (hook, currentInstance = instance) {
        if (currentInstance) {
            const hooks = currentInstance[type] || (currentInstance[type] = [])
            hooks.push(() => {
                // invokefns
                setCurrentInstance(currentInstance)
                hook() // 用户的逻辑
                setCurrentInstance(null)
            }) // 当用户调用onMounted的时候 我们将用户的函数存起来了。
            // 这个方法可能是延迟到setup执行之后才调用的，这个时候实例已经销毁了
        }
    }
}

export const onBeforeMount = createInvoker(LifeCycle.BEFORE_MOUNT)
export const onMounted = createInvoker(LifeCycle.MOUNTED)
export const onBeforeUpdate = createInvoker(LifeCycle.BFORE_UPDATE)
export const onUpdated = createInvoker(LifeCycle.UPDATED)
export const onBeforeUnmount = createInvoker(LifeCycle.BEFORE_UNMOUNT)
export const onUnmounted = createInvoker(LifeCycle.UNMOUNTED)
