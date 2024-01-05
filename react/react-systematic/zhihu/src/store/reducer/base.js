import * as TYPES from '../action-type'

let initial = {
    info: null,
}

export default function baseReducer(state = initial, action) {
    state = { ...state }
    switch (action.type) {
        // 更新登陆信息
        case TYPES.BASE_INFO:
            state.info = action.info
            break
        default:
    }

    return state
}
