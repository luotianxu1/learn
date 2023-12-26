import React, { useState } from 'react'
import { Button } from 'antd'

// 官方建议：需要多个状态，就把useState执行多次即可
const Vote = function Vote(props) {
    let [supNum, setSupNum] = useState(10)
    let [oppNum, setOppNum] = useState(10)

    const handle = (type) => {
        if (type === 'sup') {
            setSupNum(supNum + 1)
            return
        }
        setOppNum(oppNum - 1)
    }

    return (
        <div className='vote-box'>
            <div className='header'>
                <h2 className='title'>{props.title}</h2>
                <span>{supNum + oppNum}</span>
            </div>
            <div className='main'>
                <p>支持人数：{supNum}人</p>
                <p>反对人数：{oppNum}人</p>
            </div>
            <div className='footer'>
                <Button type='primary' onClick={handle.bind(null, 'sup')}>
                    支持
                </Button>
                <Button
                    type='primary'
                    danger
                    onClick={handle.bind(null, 'opt')}
                >
                    反对
                </Button>
            </div>
        </div>
    )
}

// const Vote = function Vote(props) {
//     let [state, setState] = useState({
//         supNum: 10,
//         optNum: 5,
//     })

//     const handle = (type) => {
//         if (type === 'sup') {
//             setState({
//                 ...state,
//                 supNum: state.supNum + 1,
//             })
//             return
//         }
//         setState({
//             ...state,
//             optNum: state.optNum - 1,
//         })
//     }

//     return (
//         <div className='vote-box'>
//             <div className='header'>
//                 <h2 className='title'>{props.title}</h2>
//                 <span>{state.supNum + state.optNum}</span>
//             </div>
//             <div className='main'>
//                 <p>支持人数：{state.supNum}人</p>
//                 <p>反对人数：{state.optNum}人</p>
//             </div>
//             <div className='footer'>
//                 <Button type='primary' onClick={handle.bind(null, 'sup')}>
//                     支持
//                 </Button>
//                 <Button
//                     type='primary'
//                     danger
//                     onClick={handle.bind(null, 'opt')}
//                 >
//                     反对
//                 </Button>
//             </div>
//         </div>
//     )
// }

export default Vote
