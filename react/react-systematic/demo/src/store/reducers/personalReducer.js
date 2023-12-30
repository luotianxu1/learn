// Persion模块下reducer
import * as TYPES from '../action.types'

const initial = {
    num: 100,
    info: null,
}

export default function voteReducer(state = initial, action) {
    state = { ...state }

    switch (action.type) {
        case TYPES.PERSION_INFO:
            state.info = action.payload
            break
        default:
    }

    return state
}
