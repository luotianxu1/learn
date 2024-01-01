import React from 'react'
import {
    Link,
    useHistory,
    useLocation,
    useRouteMatch,
    withRouter,
    NavLink,
} from 'react-router-dom'
import styled from 'styled-components'

// 导航样式
const NavBox = styled.nav`
    a {
        margin-right: 20px;
        color: #000;
        &.active {
            color: red;
        }
    }
`

/**
 * 只要在<HashRouter>/<BrowserRouter>中渲染组件
 * 我们在组件内部基于useHistory/useLocation/useRoutematch这些Hook函数，就可以获取history/location/match这些对象信息
 * 即便这个组件并不是基于<Route>匹配渲染的
 *
 * 只有基于<Route>匹配渲染的组件，才可以基于props属性，获取这三个对象信息
 *
 * 问题：如果当前组件是一个类组件，在<HashRouter>内，但是并没有经过<Route>匹配渲染，我们如何获取三个对象信息呢？
 *  解决方案：基于函数高阶组件，自己包裹一层进行处理
 *  在react-router-domv5版本中，自带来一个高阶组件withrouter,就是用来解决这个问题的
 *
 */

// const HomeHead = function HomeHead() {
//     let history = useHistory()
//     let location = useLocation()
//     let match = useRouteMatch()
//     console.log(history, location, match)
//     return (
//         <NavBox>
//             <Link to='/a'>A</Link>
//             <Link to='/b'>B</Link>
//             <Link to='/c'>C</Link>
//         </NavBox>
//     )
// }

// export default HomeHead

class HomeHead extends React.Component {
    render() {
        console.log(this.props)
        return (
            <NavBox>
                {/* <Link to='/a'>A</Link>
                <Link to='/b'>B</Link>
                <Link to='/c'>C</Link> */}
                {/* 
                都是实现路由跳转的，语法上几乎一样，区别就是：
                每一次页面加载或者路由切换完毕，都会拿最新的路由地址，和NavLink中to指定的地址【或者patname】地址进行匹配
                 + 匹配上会默认设置active选中样式类【我们可以基于activeClassName重新设置选中的样式类名】
                 + 我们也可以设置exact精准匹配
                基于这样的机制，我么你就可以给选中的导航设置相关的选中样式
                */}
                <NavLink to='/a'>A</NavLink>
                <NavLink to='/b'>B</NavLink>
                <NavLink to='/c'>C</NavLink>
            </NavBox>
        )
    }
}

// const Handle = function Handle(Component) {
//     // Component：真正需要渲染的组件
//     // 返回一个代理/高阶组件【导出去供别的地方调用的就是hoc组件】
//     return function HOC(props) {
//         // props: 调用HOC传递的属性，其实这些属性原本是想传递给HomeHead的
//         //  hoc是个函数组件，我们可以在这里基于Hook函数获取需要的三个对象信息，然后手动作为属性，传递给HomeHead
//         let history = useHistory()
//         let location = useLocation()
//         let match = useRouteMatch()
//         return (
//             <Component
//                 {...props}
//                 history={history}
//                 location={location}
//                 match={match}
//             ></Component>
//         )
//     }
// }
// export default Handle(HomeHead)

export default withRouter(HomeHead)
