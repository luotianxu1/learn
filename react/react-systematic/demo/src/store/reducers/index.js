// 合并各个模块的reducer
import { combineReducers } from 'redux'
import voteReducer from './voteReducer'
import persionReducer from './voteReducer'
import demoReducer from './demoReducer'

const reducer = combineReducers({
    vote: voteReducer,
    persion: persionReducer,
    demo: demoReducer,
})

export default reducer
