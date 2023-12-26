import { Button } from 'antd'
import React, { useState } from 'react'

// useState
// 目的是再函数组件中使用状态，并且后期基于状态的修改，可以让组件更新
const Demo = function Demo() {
    let [num, setNum] = useState(0)

    const handle = () => {
        setNum(num + 1)
    }

    return (
        <div>
            <span>{num}</span>
            <Button type='primary' size='small' onClick={handle}>
                新增
            </Button>
        </div>
    )
}

// 纯函数组件
// const Demo = function Demo() {
//     let n = 0
//     return (
//         <div>
//             <span>{n}</span>
//             <Button
//                 type='primary'
//                 size='small'
//                 onClick={() => {
//                     n += 10
//                     console.log(n)
//                 }}
//             >
//                 新增
//             </Button>
//         </div>
//     )
// }

// 类组件
// class Demo extends React.Component {
//     state = {
//         n: 0,
//     }

//     handleAdd = () => {
//         let { n } = this.state
//         this.setState({
//             n: n + 1,
//         })
//     }

//     render() {
//         let { n } = this.state
//         return (
//             <div>
//                 <span>{n}</span>
//                 <Button type='primary' size='small' onClick={this.handleAdd}>
//                     新增
//                 </Button>
//             </div>
//         )
//     }
// }

export default Demo
