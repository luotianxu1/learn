import React from 'react'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

const B = function B(props) {
    const navigate = useNavigate()
    console.log(props)

    const handle = () => {
        // 问号传参
        // navigate({
        //     pathname: '/c',
        //     search: qs.stringify({
        //         id: 100,
        //         name: 'test',
        //     }),
        // })
        // 路径参数
        // navigate(`/c/100/test`)
        // 隐式传参
        navigate('/c', {
            replace: true,
            state: {
                id: 100,
                name: 'test',
            },
        })
    }

    return (
        <div>
            B组件的内容
            <button onClick={handle}>按钮</button>
        </div>
    )
}

export default B

/**
 * 在react-router-domv6中，实现路由跳转的方式
 * + <Link/NavLink to='/a' />点击跳转路由
 * + <Navigate to='/a' /> 遇到这个组件就会跳转
 * + 编程式导航:取消了history对象，基于navigate函数实现路由跳转
 *     const navigate = useNavigate()
        navigate('/c')
        navigate('/c', { replace: true })
        navigate({
            pathname: '/c',
            search: '?a=123',
        })
 */

/**
 * 在react-router-dom v6中，即便当前组件是基于<Route>匹配渲染的，也不会基于属性，把history/location/match传递给组件，想获取相关信息，我们只能基于Hook函数处理
 *  + 首先要确保，需要使用Hook的组件，是在Router【HashRouter或BrowserRouter】内部包着的，否则使用这些Hook会报错
 *  + 只要是基于Router内部包裹的组件，不论是否是基于<Route>匹配渲染的
 *      + 默认都不可能再基于props获取相关的对象信息了
 *      + 只能基于“路由Hook”去获取
 *
 * 为了再类组件中也可以获取路由的相关信息
 * 1.后见路由表的时候，继续让基于<Route>匹配的组件，可以基于属性获取需要的信息
 * 2.不是基于<Route>匹配渲染的组件，我们需要自己重写withRouter,让其和基于<Route>匹配渲染的组件，具备相同的属性
 */
