import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import Vote from './views/Vote'
import store from './store'
import ThemeContext from './ThemeContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <ConfigProvider locale={zhCN}>
        <ThemeContext.Provider
            value={{
                store,
            }}
        >
            <Vote></Vote>
        </ThemeContext.Provider>
    </ConfigProvider>
)
