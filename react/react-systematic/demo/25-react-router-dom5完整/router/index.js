import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
// 调用组件的时候，基于属性传递路由表进来，我们根据路由表，动态设定路由的匹配规则

const RouterView = function RouterView(props) {
    let { routes } = props
    return (
        <Switch>
            {/* 循环设置路由匹配规则 */}
            {routes.map((item, index) => {
                let {
                    redirect,
                    from,
                    to,
                    exact,
                    path,
                    component: Component,
                } = item
                let config = {}
                if (redirect) {
                    // 重定向规则
                    config = { to }
                    if (from) config.from = from
                    if (exact) config.exact = true
                    return <Redirect key={index} {...config} />
                }
                config = { path }
                if (exact) config.exact = true
                return (
                    // 正常匹配规则
                    <Route
                        key={index}
                        {...config}
                        render={(props) => {
                            // 统一基于render函数处理，当某个路由匹配，后期在这理可以做一些其他的事情
                            // Suspense.fallback:在一步加载的组件没有处理完成之前，先展示的loading效果
                            return (
                                <Suspense fallback={<>正在处理中...</>}>
                                    <Component {...props}></Component>
                                </Suspense>
                            )
                        }}
                    />
                )
            })}
        </Switch>
    )
}

export default RouterView
