import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.less'

const root = ReactDOM.createRoot(document.getElementById('root'))
let text = '123456'
root.render(
    <>
        {text}
        <p>789</p>
    </>
)
