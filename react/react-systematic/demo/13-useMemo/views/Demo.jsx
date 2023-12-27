import { Button } from 'antd'
import React, { useState, useMemo } from 'react'

const Demo = function Demo() {
    let [supNum, setSupNum] = useState(10)
    let [oppNum, setOppNum] = useState(5)
    let [x, setX] = useState(0)

    /**
     * let xxx = useMeno(callback,[dependencies])
     *  + 第一次渲染组件的时候,callback会执行
     *  + 后期只有依赖的状态发生改变,callback才会执行
     *  + 每一次会把callback执行的返回结果赋值给xxx
     *  + useMemo具备缓存的效果,在依赖的状态至没有法神改变,callback没有触发执行的时候,xxx获取的是上一次计算出来的结果
     */
    let ratio = useMemo(() => {
        console.log('OK')
        let total = supNum + oppNum
        let ratio = '=='
        if (total > 0) {
            ratio = ((supNum / total) * 100).toFixed(2) + '%'
        }
        return ratio
    }, [supNum, oppNum])

    return (
        <div className='vote-box'>
            <div className='main'>
                <p>支持人数:{supNum}人</p>
                <p>反对人数:{oppNum}人</p>
                <p>支持比率:{ratio}</p>
                <p>x:{x}</p>
            </div>
            <div className='footer'>
                <Button type='primary' onClick={() => setSupNum(supNum + 1)}>
                    支持
                </Button>
                <Button
                    type='primary'
                    danger
                    onClick={() => {
                        setOppNum(oppNum - 1)
                    }}
                >
                    反对
                </Button>
                <Button
                    onClick={() => {
                        setX(x + 1)
                    }}
                >
                    干点别的事
                </Button>
            </div>
        </div>
    )
}

export default Demo
