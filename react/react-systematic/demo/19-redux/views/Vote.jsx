import React, { useContext, useState, useEffect } from 'react'
import VoteMain from './VoteMain'
import VoteFooter from './VoteFooter'
import ThemeContext from '../ThemeContext'

/**
 * 1、在创建的store容器中，存储两部分内容
 *  + 公共状态:各组需要共享/通信的信息
 *  + 事件池：存放一些方法【让组件可以更新的方法】
 *  特点：当公共状态一旦发生改变，会默认立即通知事件池中的方法执行
 *  这些方法的执行，主要母的就是让指定的组件更新，而组件一更新，就可以获取最新的公共状态进行渲染
 *
 * 2、修改公共容器中的状态，不能直接修改
 *  + 基于dispatch派发，通知reducer执行
 *  + 在reducer中去实现状态的更新
 */

const Vote = function Vote() {
    const { store } = useContext(ThemeContext)
    let { supNum, oppNum } = store.getState()

    // 组件第一次渲染完毕后，把让组件更新的方法，放在STORE事件池中
    // let [num, setNum] = useState(0)

    // const update = () => {
    //     setNum(num + 1)
    // }
    // useEffect(() => {
    //     // let unsubscribe = store.subscribe(让组件更新的方法)
    //     //  + 把让组件更新的方法放在STORE事件池中
    //     //  + 返回的unsubscribe方法执行，可以把刚才放入事件池中的方法移除掉
    //     let unsubscribe = store.subscribe(update)
    //     return () => {
    //         unsubscribe()
    //     }
    // }, [num])

    let [_, setNum] = useState(0)
    useEffect(() => {
        store.subscribe(() => {
            setNum(+new Date())
        })
    }, [])

    return (
        <div className='vote-box'>
            <div className='header'>
                <h2 className='title'>React</h2>
                <span className='num'>{supNum + oppNum}</span>
            </div>
            <VoteMain></VoteMain>
            <VoteFooter></VoteFooter>
        </div>
    )
}

export default Vote
