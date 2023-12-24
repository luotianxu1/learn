import React from 'react'
import ReactDOM from 'react-dom/client'
import Vote from './views/Vote'
import Demo from './views/Demo'

const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
//     <>
//         <Vote title='hello'></Vote>
//     </>
// )

// setTimeout(() => {
//     root.render(
//         <>
//             <Vote title='我是五秒后传递的标题'></Vote>
//         </>
//     )
// }, 5000)

root.render(
    <>
        <Demo></Demo>
    </>
)
