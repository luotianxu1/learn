const delay = (interval = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    namespace: 'vote',
    state: {
        supNum: 10,
        oppNum: 5,
    },
    reducers: {
        support(state, action) {
            state = { ...state }
            let { payload = 1 } = action
            state.supNum += payload
            return state
        },
        oppose(state, action) {
            state = { ...state }
            let { payload = 1 } = action
            state.oppNum += payload
            return state
        },
    },
    effects: {
        supportAsync: [
            function* ({ payload }, { call, put }) {
                yield call(delay, 2000)
                yield put({ type: 'support', payload })
            },
            { type: 'takeLatest' },
        ],
        *opposeAsync({ payload }, { call, put }) {
            yield call(delay, 2000)
            yield put({ type: 'oppose', payload })
        },
    },
}
