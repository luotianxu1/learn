import { Button } from 'antd'
import React, { useState, useEffect, useRef } from 'react'

let prev1
let prev2
const Demo = function Demo() {
    let [num, setNum] = useState(0)

    let box1 = useRef(null)
    let box2 = React.createRef()
    if (!prev1) {
        // 第一次DEMO执行，把第一次创建的REF对象赋值给变量
        prev1 = box1
        prev2 = box2
    } else {
        // 第二次DEMO执行，我们验证一下，新创建的REF对象和之前创建的REF对象，是否一致
        console.log(prev1 === box1) // true useRef在每一次组件更新的时候（函数重新执行），再次执行useRef的时候，不会创建新的REF对象，获取到达还是第一次创建的那个REF对象
        console.log(prev2 === box2) // false createRef在每一次组件更新的时候，都会创建一个全新的REF对象出来，比较浪费性能
    }

    useEffect(() => {
        console.log(box1.current)
        console.log(box2.current)
    }, [])

    const handle = () => {
        setNum(num + 1)
    }

    return (
        <div>
            <span ref={box1}>{num}</span>
            <span ref={box2}>哈哈哈</span>
            <Button type='primary' size='small' onClick={handle}>
                新增
            </Button>
        </div>
    )
}

export default Demo
