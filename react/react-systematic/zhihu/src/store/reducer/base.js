import * as TYPES from '../action-type'

let initial = {
    info: null,
}

export default function baseReducer(state = initial, action) {
    state = { ...state }
    switch (action.type) {
        default:
    }

    return state
}
