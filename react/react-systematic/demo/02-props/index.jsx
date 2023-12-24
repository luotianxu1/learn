import React from 'react'
import ReactDOM from 'react-dom/client'
import DemoOne from './views/DemoOne'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <>
        <DemoOne
            title='我是标题'
            x={10}
            className='box'
            style={{ fontSize: '20px' }}
        ></DemoOne>

        <DemoOne title='我是标题'></DemoOne>
    </>
)
