import {
    take,
    takeEvery,
    takeLatest,
    throttle,
    debounce,
    call,
    apply,
    delay,
    put,
    select,
    fork,
    all,
} from 'redux-saga/effects'
import * as TYPES from './action.types'

const workingCount = function* workingCount(action) {
    yield delay(1000)
    yield put({ type: TYPES.DEMO_COUNT, payload: 10 })
}
const workingSupport = function* workingSupport(action) {
    yield delay(1000)
    yield put({ type: TYPES.VOTE_SUP })
}
const workingOppose = function* workingOppose(action) {
    yield delay(1000)
    yield put({ type: TYPES.VOTE_OPP })
}

const saga = function* saga() {
    yield takeLatest(`${TYPES.DEMO_COUNT}@SAGA@`, workingCount)
    yield takeLatest(`${TYPES.VOTE_SUP}@SAGA@`, workingSupport)
    yield takeLatest(`${TYPES.VOTE_OPP}@SAGA@`, workingOppose)
}

export default saga
