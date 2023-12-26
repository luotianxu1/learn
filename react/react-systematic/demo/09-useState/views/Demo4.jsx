import { Button } from 'antd'
import { useState } from 'react'
import { flushSync } from 'react-dom'

const Demo4 = function Demo4() {
    console.log('render')
    let [x, setX] = useState(10)

    const handle = () => {
        // for (let i = 0; i < 10; i++) {
        //     setX(x + 1)
        // }

        for (let i = 0; i < 10; i++) {
            setX((prev) => {
                console.log(prev)
                return prev + 1
            })
        }
    }

    return (
        <div className='demo'>
            <span className='num'>x:{x}</span>
            <Button type='primary' size='small' onClick={handle}>
                新增
            </Button>
        </div>
    )
}

export default Demo4
