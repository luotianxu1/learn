import { Button } from 'antd'
import React, { useEffect, useState } from 'react'

/**
 * useEffect：在函数组件中，使用生命周期函数
 * useEffect(callback):
 *  + 第一次渲染完毕后，执行callback，等价于componentDidMount
 *  + 再组件每一次更新完毕后，也会执行callback，等价于componentDidUpdate
 *
 * useEffect(callback,[]):
 *  + 只有第一次渲染完毕后，才会执行callback,每一次试图更新完毕后，callback不再执行，类似于componentDidMount
 *
 * useEffect(callback,[依赖的状态(多个状态)]):
 *  + 第一次渲染完毕会执行callback
 *  + 当依赖的状态值（多个或一个）发生改变，也会触发callback
 *  + 但是依赖的状态没有变化，在组件更新的时候，callback不会执行
 *
 * useEffect(() => {
 *      return() => {
 *          // 返回的小函数，会在组件释放的时候执行，如果组件更新，会把上一次返回的小函数执行
 *      }
 * })
 */

const queryData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([10, 20, 30])
        }, 2000)
    })
}
const Demo = function Demo() {
    let [num, setNum] = useState(0)
    let [x, setX] = useState(100)

    useEffect(() => {
        // 获取最新的状态值
        console.log('@1', num)
    })

    useEffect(() => {
        console.log('@2', num)
    }, [])

    useEffect(() => {
        console.log('@3', num)
    }, [num, x])

    useEffect(() => {
        return () => {
            // 获取上一次的状态值
            console.log('@4', num)
        }
    }, [num])

    // useEffect必须在函数的最外城上下文中调用，不能把其嵌入到条件判断、循环等操作语句中
    // if(num > 5) {
    //     useEffect(() => {
    //         console.log('ok');
    //     })
    // }
    useEffect(() => {
        if (num > 5) {
            console.log('ok')
        }
    }, [num])

    // 第一次渲染完毕后，从服务器异步获取数据
    // useEffect如果设置返回值，则返回值必须是一个函数（代表组件销毁时触发），下面案例中callback经过async修饰，返回的是一个promise实例，不符合要求
    // useEffect(async () => {
    //     let data = await queryData()
    //     console.log('成功', data)
    // }, [])
    // useEffect(() => {
    //     queryData().then((data) => {
    //         console.log('成功', data)
    //     })
    // }, [])
    useEffect(() => {
        const next = async () => {
            let data = await queryData()
            console.log('成功', data)
        }
        next()
    }, [])

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
