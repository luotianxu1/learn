import { Button } from 'antd'
import React, { useEffect, useLayoutEffect, useState } from 'react'

/**
 * useLayoutEffect会阻塞浏览器渲染真实DOM。优先执行Effect链表中的callback
 * useEffect不会阻塞浏览器渲染真实DOM，在渲染真实DOM的同时，去执行Effect链表中的callback
 *  +useLayoutEffect设置的callback要优先于useEffect去执行
 *  +在两者设置的callback中，依然可以获取DOM元素，原因：真实DOM对象已经创建了。区别只是浏览器是否渲染
 *  +如果在callback函数中又修改了状态值（试图又要更新）
 *      +useEffect：浏览器肯定是第一次的真实已经绘制了，再去渲染第二次真实DOM
 *      +useLayoutEffect:浏览器是把两次真实DOM渲染，合并在一起渲染的
 *
 * 视图更新的步骤：
 *  第一步：基于babel-preset-react-app把jsx编译为createElement格式
 *  第二步：把createElement执行，创建出virtualDOM
 *  第三步：基于root.render方法把virtualDOM变为真实DOM对象
 *      useLayoutEffect阻塞第四步操作，先去执行Effect链表中的方法[同步操作]
 *      useEffect第四步操作和Effect链表中的方法执行，是同时进行的
 *  第四步：浏览器渲染和绘制真实DOM对象
 */
const Demo = function Demo() {
    console.log('render')
    let [num, setNum] = useState(0)

    // useLayoutEffect(() => {
    //     if (num === 0) {
    //         setNum(10)
    //     }
    // }, [num])

    useLayoutEffect(() => {
        console.log('useLayoutEffect') // 第一个输出
    }, [num])

    useEffect(() => {
        console.log('useEffect') // 第二个输出
    }, [num])

    const handle = () => {
        setNum(0)
    }

    return (
        <div
            style={{
                width: '100px',
                height: '100px',
                backgroundColor: num === 0 ? 'red' : 'green',
            }}
        >
            <span>{num}</span>
            <Button type='primary' size='small' onClick={handle}>
                新增
            </Button>
        </div>
    )
}

export default Demo
