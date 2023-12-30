export const createStore = function createStore(reducer) {
    if (typeof reducer !== 'function') {
        throw new Error('Expected the reducer to be a function.')
    }

    let state, // 存放公共状态
        listeners = [] // 事件池

    // 获取公共状态
    const getState = function getState() {
        // 返回公共状态信息
        return state
    }

    // 向事件池中加入让组件更新的方法
    const subscribe = function subscribe(listener) {
        if (typeof listener !== 'function')
            throw new TypeError('Expected the listener to be a function')
        // 把传入的方法（让组件更新的方法）加入到事件池当中【需要做驱虫处理】
        if (!listeners.includes(listener)) {
            listeners.push(listener)
        }

        // 返回一个从事件池中移除方法的函数
        return function unsubscribe() {
            let index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }
    }

    // 派发任务通知REDUCER执行
    const dispatch = function dispatch(action) {
        if (typeof action.type === 'undefined')
            throw new Error('Actions may not have an undefined "type" property')
        // 执行reducer函数,传递：公共状态、行为对象 接收返回值，替换公共状态
        state = reducer(state, action)

        // 当状态更改，我们还需要把事件池中的方法执行
        listeners.forEach((listener) => listener())
        return action
    }

    const randomString = () => {
        return Math.random().toString(36).substring(7).split('').join('.')
    }

    // redux内部会默认进行一次dispatch派发，目的：给公共容器中的状态复制初始值
    dispatch({
        type: '@@redux/INIT' + randomString(),
    })

    return {
        getState,
        subscribe,
        dispatch,
    }
}
