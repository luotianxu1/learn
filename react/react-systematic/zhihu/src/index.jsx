import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// REM
import 'lib-flexible'

import { ConfigProvider } from 'antd-mobile'
import zhCN from 'antd-mobile/es/locales/zh-CN'

// 样式
import './index.less'

// 处理最大宽度
;(function () {
    const handleMax = function handleMax() {
        let html = document.documentElement
        let root = document.getElementById('root')
        let deviceW = html.clientWidth
        root.style.maxWidth = '750px'
        if (deviceW >= 705) {
            html.style.fontSize = '75px'
        }
    }
    handleMax()
})()

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <ConfigProvider locale={zhCN}>
        <App></App>
    </ConfigProvider>
)
