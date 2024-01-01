// A组件的二级路由表
import { lazy } from 'react'

const routes = [
    {
        redirect: true,
        from: '/a',
        to: '/a/a1',
        exact: true,
    },
    {
        path: '/a/a1',
        name: 'a1',
        component: lazy(() =>
            import(/* webpackChunkName:'AChild' */ '../views/a/A1')
        ),
        meta: {},
        children: [],
    },
    {
        path: '/a/a2',
        name: 'a2',
        component: lazy(() =>
            import(/* webpackChunkName:'AChild' */ '../views/a/A2')
        ),
        meta: {},
        children: [],
    },
    {
        path: '/a/a3',
        name: 'a3',
        component: lazy(() =>
            import(/* webpackChunkName:'AChild' */ '../views/a/A3')
        ),
        meta: {},
        children: [],
    },
]

export default routes
