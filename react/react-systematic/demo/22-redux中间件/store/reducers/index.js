// 合并各个模块的reducer
import { combineReducers } from 'redux'
import voteReducer from './voteReducer'
import persionReducer from './voteReducer'

const reducer = combineReducers({
    vote: voteReducer,
    persion: persionReducer,
})

export default reducer
