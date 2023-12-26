import React, { useState, useEffect, useRef, useImperativeHandle } from 'react'

const Child = React.forwardRef(function Child(props, ref) {
    let [text, setText] = useState('nihao1')
    const submit = () => {}

    useImperativeHandle(ref, () => {
        return {
            text,
            submit,
        }
    })

    return (
        <div className='child-box'>
            <span ref={ref}>哈哈哈</span>
        </div>
    )
})

const Demo = function Demo() {
    let x = useRef(null)
    useEffect(() => {
        console.log(x.current)
    }, [])

    return (
        <div>
            <Child ref={x}></Child>
        </div>
    )
}

export default Demo
