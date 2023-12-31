import React from 'react'
import ReactDOM from 'react-dom/client'
import Task from './views/Task'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import './index.less'
import { Provider } from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <Task></Task>
        </Provider>
    </ConfigProvider>
)
