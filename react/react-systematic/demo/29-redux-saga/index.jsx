import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import Vote from './views/Vote'
import Demo from './views/Demo'
import store from './store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <Vote></Vote>
            <br></br>
            <Demo></Demo>
        </Provider>
    </ConfigProvider>
)
