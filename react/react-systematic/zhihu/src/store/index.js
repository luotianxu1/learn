import { createStore, applyMiddleware } from 'redux'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import reducer from './reducer'

// 根据不同的环境，使用不同的中间件
let middleware = [reduxThunk, reduxPromise]
let env = process.env.NODE_ENV
if (env === 'development') {
    middleware.push(reduxLogger)
}

const store = createStore(reducer, applyMiddleware(...middleware))

export default store
