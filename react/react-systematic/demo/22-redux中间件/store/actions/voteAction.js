import * as TYPES from '../action.types'

const delay = (interval = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}

const voteAction = {
    // redux-thunk
    support() {
        return async (dispatch) => {
            await delay() // 模拟网络请求
            dispatch({
                type: TYPES.VOTE_SUP,
            })
        }
    },
    // redux-promise
    async oppose() {
        await delay(2000)
        return {
            type: TYPES.VOTE_OPP,
        }
    },
}

export default voteAction
