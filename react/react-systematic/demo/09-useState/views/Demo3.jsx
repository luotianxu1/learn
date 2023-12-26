import { Button } from 'antd'
import { useState } from 'react'
import { flushSync } from 'react-dom'

const Demo3 = function Demo3() {
    console.log('render')
    let [x, setX] = useState(10)
    let [y, setY] = useState(20)
    let [z, setZ] = useState(30)

    const handle = () => {
        flushSync(() => {
            setX(x + 1)
            setY(y + 1)
        })
        setZ(z + 1)
    }

    return (
        <div className='demo'>
            <span className='num'>x:{x}</span>
            <span className='num'>y:{y}</span>
            <span className='num'>z:{z}</span>
            <Button type='primary' size='small' onClick={handle}>
                新增
            </Button>
        </div>
    )
}

export default Demo3
