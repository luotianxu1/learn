import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import './index.less'
import Demo from './views/Demo'
import Demo2 from './views/Demo2'
import Demo3 from './views/Demo3'
import Demo4 from './views/Demo4'
import Demo5 from './views/Demo5'
import Vote from './views/Vote'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <ConfigProvider locale={zhCN}>
        <Demo></Demo>
        <br />
        <Demo2></Demo2>
        <br />
        <Vote title='hello'></Vote>
        <br />
        <Demo3></Demo3>
        <br />
        <Demo4></Demo4>
        <br />
        <Demo5 x={1} y={10}></Demo5>
    </ConfigProvider>
)
