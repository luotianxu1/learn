import React from 'react'
import ReactDOM from 'react-dom/client'
import DemoOne from './views/DemoOne'
import DemoTwo from './views/DemoTwo'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <>
        <DemoOne
            title='我是标题'
            x={10}
            className='box'
            style={{ fontSize: '20px' }}
        >
            <span>哈哈哈哈哈哈哈哈哈</span>
            <span>呵呵呵呵呵呵呵</span>
        </DemoOne>

        <DemoOne
            title='我是标题'
            x={10}
            className='box'
            style={{ fontSize: '20px' }}
        >
            <span>12312312312312</span>
        </DemoOne>

        <DemoOne title='我是标题'></DemoOne>

        <DemoTwo>
            <span slot='footer'>我是页脚</span>
            <span slot='header'>我是页眉</span>
        </DemoTwo>
    </>
)
