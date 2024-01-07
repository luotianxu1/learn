import * as TYPES from '../action.types'

const delay = (interval = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}

const voteAction = {
    supportAction() {
        return {
            type: TYPES.VOTE_SUP,
        }
    },
    supportActionAsync() {
        return async (dispatch) => {
            await delay()
            dispatch({
                type: TYPES.VOTE_SUP,
            })
        }
    },
    opposeAction() {
        return {
            type: TYPES.VOTE_OPP,
        }
    },
    async opposeActionAsync() {
        await delay()
        return {
            type: TYPES.VOTE_OPP,
        }
    },
}

export default voteAction
