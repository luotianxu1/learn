// TASK板块切片
import { createSlice } from '@reduxjs/toolkit'

const taskSkice = createSlice({
    // 设置切片名字
    name: 'task',
    // 设置此切片对应的reducer中的初始状态
    initialState: {
        taskList: null,
    },
    // 编写不同业务逻辑下，对公共状态的更改
    reducers: {
        getAllTaskList(state, action) {
            // state:redux中的公共状态信息【基于immer库管理，无需自己再克隆了】
            // action:派发的行为对象，我们无需考虑行为标识的问题，传递的其他信息，都是一action.payload传递进来的值
            state.taskList = action.payload
        },
        removeTask(state, { payload }) {
            let taskList = state.taskList
            if (!Array.isArray(taskList)) {
                return
            }
            state.taskList = taskList.filter((item) => +item.id !== +payload)
        },
    },
})

let { getAllTaskList, removeTask } = taskSkice.actions

export const getAllTaskListAsync = () => {
    return async (dispatch) => {
        await delay()
        dispatch(
            getAllTaskList([
                {
                    id: 1,
                    task: '今天天气很不错今天天气很不错今天天气很不错今天天气很不错今天天气很不错今天天气很不错今天天气很不错今天天气很不错',
                    state: 1,
                    time: '2022-11-29 18:00:00',
                    complete: '2022-11-30 18:00:00',
                },
                {
                    id: 2,
                    task: 'react',
                    state: 2,
                    time: '2022-11-29 18:00:00',
                    complete: '2022-11-30 18:00:00',
                },
            ])
        )
    }
}

const delay = (interval = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}

export default taskSkice.reducer
