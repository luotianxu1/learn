import { Button } from 'antd'
import React, { useState } from 'react'

/**
 * useState
 * 目的是再函数组件中使用状态，并且后期基于状态的修改，可以让组件更新
 * 函数组件的每一次渲染（或者是更新），都是函数重新执行，产生一个全新的“私有上下文”
 * +内部代码都需要重新执行
 * +涉及到的函数需要重新的构建（这些函数的作用域（函数执行的上下文），是每一次执行DEMO产生的闭包）
 * +每一次执行DEMO函数，也会把useState重新执行，但是：
 *  +执行useState，只有第一次设置的初始值会生效，以后再执行，获取的状态值都是最新的状态值而不是初始值
 *  +返回的修改状态的方法，每一次都是返回一个新的
 * @returns
 */

// var _state
// function useState(initialValue) {
//     if (typeof _state === 'undefined') _state = initialValue
//     var setState = function setState(value) {
//         _state = value
//     }
//     return [_state, setState]
// }

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

export default Demo
