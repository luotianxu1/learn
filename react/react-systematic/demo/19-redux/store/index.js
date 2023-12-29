import { createStore } from 'redux'

let inital = {
    supNum: 10,
    oppNum: 5,
}
const reducer = function reducer(state = inital, action) {
    // state: 存储store容器中的公共状态【最开始没有的时候，赋值初始状态值initaial】
    // action:每一次基于dispatch派发的时候，产地进来的行为对象【要求必须具备type属性，存储派发的行为标识】
    // 我们操作state，不会直接修改容器中的状态【要等到最后return的时候】我们需要先克隆
    // 基于派发的行为标识，修改STORE容器中的公共状态
    state = { ...state }
    switch (action.type) {
        case 'VOTE_SUP':
            state.supNum++
            break
        case 'VOTE_OPP':
            state.oppNum++
            break
        default:
    }

    return state
}

const store = createStore(reducer)
export default store
