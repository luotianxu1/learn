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
} from 'redux-saga/effects'
import * as TYPES from './action.types'

const api = {
    queryData(id, name) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let result = {
                    code: 0,
                    data: [10, 20, 30, 40],
                }
                resolve(result)
            }, 2000)
        })
    },
    queryBanner() {
        return new Promise((resolve) => {
            setTimeout(() => {
                let result = {
                    code: 0,
                    data: '轮播图',
                }
                resolve(result)
            }, 1000)
        })
    },
}

// 创建执行函数，在任务被监听后，去做异步操作
const workingCount = function* workingCount(action) {
    // let { num } = yield select((state) => state.demo)
    // console.log(num)
    // yield delay(2000) // 延迟函数
    // // 派发任务
    // yield put({
    //     type: TYPES.DEMO_COUNT,
    //     payload: action.payload,
    // })
    // let { code, data } = yield call(api.queryData, 108, '珠峰')
    // yield put({
    //     type: TYPES.DEMO_COUNT,
    //     payload: action.payload,
    // })
    // let { data } = yield call(api.queryData, 100, 'test')
    // console.log('1')
    // let { data: data2 } = yield call(api.queryBanner)
    // console.log('2')

    let aaa = yield fork(api.queryData, 108, 'test')
    console.log(aaa)
    yield fork(api.queryBanner)
}

// 创建监听器，监听派发任务
const saga = function* saga() {
    // while (true) {
    //     yield take(`${TYPES.DEMO_COUNT}@SAGA@`)
    //     yield workingCount()
    // }
    // yield takeEvery(`${TYPES.DEMO_COUNT}@SAGA@`, workingCount)
    // yield takeLatest(`${TYPES.DEMO_COUNT}@SAGA@`, workingCount)
    // yield throttle(500, `${TYPES.DEMO_COUNT}@SAGA@`, workingCount)
    yield throttle(500, `${TYPES.DEMO_COUNT}@SAGA@`, workingCount)
}

export default saga

/**
 * yield take（异步标识） 创建监听器，监听派发指定标识的异步任务
 * yield takeEvery(异步标识，要执行的方法) 等价于while(true)
 * yield delay 启动一个延迟函数
 * yield takeLatest(异步标识，要执行的方法) 防抖
 * yield throttle(ms,异步标识，要执行的方法) 节流
 * yield debounce(ms,异步标识，要执行的方法) 对异步任务的检测做防抖处理，在指定时间内，触发多次，任务也只能被检测到一次
 *
 *
 * let { num } = yield select((state) => state.demo) 基于mapState函数，返回需要使用到公共状态
 * let result = yield call(方法，...实参) 基于call方法，可以吧指定的函数执行，把，实参一项项传递给方法 串行，上一个请求成功，才是执行下一个
 * let result = yield apply(this,方法,[实参1，实参2])
 * yield fork 并行
 */
