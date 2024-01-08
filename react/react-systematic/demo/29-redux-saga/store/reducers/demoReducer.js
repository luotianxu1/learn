// Demo模块下reducer
import * as TYPES from '../action.types'

const initial = {
    num: 10,
}

export default function demoReducer(state = initial, action) {
    state = { ...state }
    let { payload = 1 } = action

    switch (action.type) {
        case TYPES.DEMO_COUNT:
            state.num += payload
            break
        default:
    }

    return state
}
