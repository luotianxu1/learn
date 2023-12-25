import React from 'react'
import ReactDOM from 'react-dom/client'
import Demo from './views/Demo'
import Demo2 from './views/Demo2'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <>
        <Demo></Demo>
        <br />
        <Demo2></Demo2>
    </>
)
