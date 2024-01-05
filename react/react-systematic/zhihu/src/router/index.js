import React, { Suspense, useEffect, useState } from 'react'
import {
    Routes,
    Route,
    useNavigate,
    useLocation,
    useParams,
    useSearchParams,
} from 'react-router-dom'
import routes from './routes'
import { Mask, DotLoading, Toast } from 'antd-mobile'
import store from '../store'
import action from '../store/action'

// 统一路由配置
const isCheckLogin = (path) => {
    let {
        base: { info },
    } = store.getState()
    let checkList = ['/personal', '/store', '/update']
    return !info && checkList.includes(path)
}
const Element = function Element(props) {
    let { component: Component, meta, path } = props
    let isShow = !isCheckLogin(path)
    let [_, setRandom] = useState(0)
    let {
        base: { info },
    } = store.getState()

    // 登录态校验
    useEffect(() => {
        if (isShow) return
        ;(async () => {
            let infoAction = await action.base.queryuseInfoAsync()
            info = infoAction.info
            if (!info) {
                // 如果获取后还是不存在说明没有登录
                Toast.show({
                    icon: 'fail',
                    content: '请先登录',
                })
                // 跳转到登录页
                navigate(
                    {
                        pathname: '/login',
                        search: `?to=${path}`,
                    },
                    {
                        replace: true,
                    }
                )
                return
            }
            // 如果获取到了信息，说明是登录的，我们派发任务把信息存储到容器中
            store.dispatch(infoAction)
            setRandom(+new Date())
        })()
    })

    // 修改页面的title
    let { title = '知乎日报-WebApp' } = meta || {}
    document.title = title

    // 获取路由信息，基于属性传递给组件
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    const [usp] = useSearchParams()
    return (
        <>
            {isShow ? (
                <Component
                    navigate={navigate}
                    location={location}
                    params={params}
                    usp={usp}
                ></Component>
            ) : (
                <Mask visible={true}>
                    <DotLoading color='white'></DotLoading>
                </Mask>
            )}
        </>
    )
}

export default function RouterView() {
    return (
        <Suspense
            fallback={
                <Mask visible={true} opacity='thick'>
                    <DotLoading color='white'></DotLoading>
                </Mask>
            }
        >
            <Routes>
                {routes.map((item) => {
                    let { name, path } = item
                    return (
                        <Route
                            key={name}
                            path={path}
                            element={<Element {...item}></Element>}
                        ></Route>
                    )
                })}
            </Routes>
        </Suspense>
    )
}
