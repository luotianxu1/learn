const combineReducers = function combineReducers(reducers) {
    // reducers是一个对象，以键值对存储了 模块名 & 每一个模块的reducer

    let reducerskeys = Reflect.ownKeys(reducers)
    /**
     * 返回一个合并的reducer
     *  + 每一次dispatch派发，都是把这个reducer执行
     *  + state就是redux容器中的公共状态
     *  + action就是派发时候传递进来的行为对象
     */
    return function reducer(state = {}, action) {
        // 把reducers中的每一个小的reducer(每个模块的reducer)执行
        let nextState = {}
        reducerskeys.forEach((key) => {
            let reducer = reducers[key]
            nextState[key] = reducer(state[key], action)
        })
        return nextState
    }
}

export default combineReducers
