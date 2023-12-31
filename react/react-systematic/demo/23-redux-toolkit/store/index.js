import { configureStore } from '@reduxjs/toolkit'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import taskSliceReducer from './features/taskSlice'

const store = configureStore({
    // 制定reducer
    reducer: {
        // 按照模块管理各个切片
        task: taskSliceReducer,
    },
    // 使用中间件[如果我们不置顶任何中间件，则默认集成了reduxThunk；但是一旦设置，会整体替换默认值，需要手动指定thunk中间件]
    middleware: [reduxLogger, reduxThunk],
})

export default store
