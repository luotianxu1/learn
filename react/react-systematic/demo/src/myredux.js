export const createStore = function createStore(reducer) {
    let state, // 存放公共状态
        listeners = [] // 事件池

    // 获取公共状态
    const getState = function getState() {
        return state
    }

    // 向事件池中加入让组件更新的方法
    const subscribe = function subscribe(listener) {
        if (typeof listener !== 'function')
            throw new TypeError('Expected the listener to be a function')
    }

    // 派发任务通知REDUCER执行
    const dispatch = function dispatch(action) {}

    return {
        getState,
        subscribe,
        dispatch,
    }
}
