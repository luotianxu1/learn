// Persion模块下reducer
import * as TYPES from '../action.types'

const initial = {
    supNum: 10,
    oppNum: 5,
}

export default function persionReducer(state = initial, action) {
    state = { ...state }

    switch (action.type) {
        case TYPES.VOTE_SUP:
            state.supNum++
            break
        case TYPES.VOTE_OPP:
            state.oppNum++
            break
        default:
    }

    return state
}
