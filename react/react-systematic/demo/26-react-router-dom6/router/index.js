import React, { Suspense } from 'react'
import {
    Routes,
    Route,
    useNavigate,
    useLocation,
    useParams,
    useSearchParams,
} from 'react-router-dom'
import routes from './routes'

// 统一渲染的组件：在这里可以做一些事情【权限/登录状态校验】
const Element = function Element(props) {
    let { component: Component } = props
    // 把路由信息先获取到，最后基于属性传递给组件,之哟啊是基于<Route>匹配渲染的组件，都可以基于属性获取路由信息
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    const [usp] = useSearchParams()

    // 最后要把Component进行渲染
    return (
        <Component
            navigate={navigate}
            location={location}
            params={params}
            usp={usp}
        ></Component>
    )
}

// 递归创建Route
const createRoute = function creaeteRoute(routes) {
    return (
        <>
            {routes.map((item, index) => {
                let { path, children } = item
                // 每一次路由匹配成功，不直接渲染我们设定的组件，而是渲染Element，在Element做一些特殊处理后，再去渲染我们真实要渲染的组件
                return (
                    <Route
                        key={index}
                        path={path}
                        element={<Element {...item}></Element>}
                    >
                        {Array.isArray(children) ? createRoute(children) : null}
                    </Route>
                )
            })}
        </>
    )
}

// 路由容器
export default function RouterView() {
    return (
        <Suspense fallback={<>正在处理中</>}>
            <Routes>{createRoute(routes)}</Routes>
        </Suspense>
    )
}

// 创建withRouter
export const withRouter = function withRouter(Component) {
    return function HOC(props) {
        const navigate = useNavigate()
        const location = useLocation()
        const params = useParams()
        const [usp] = useSearchParams()
        return (
            <Component
                {...props}
                navigate={navigate}
                location={location}
                params={params}
            ></Component>
        )
    }
}
