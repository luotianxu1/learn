const routes = [
    {
        path: '/',
        // 会自动去pages目录下查找，也可以自己指定详细目录
        // component: '@/pages/index"
        component: 'index',
        title: '首页',
    },
    {
        path: '/demo/:id',
        component: '@/pages/demo',
        title: '测试页',
    },
    {
        path: '/personal',
        component: 'personal',
        title: '个人中心',
        routes: [
            {
                path: '/personal',
                redirect: '/personal/order',
            },
            {
                path: '/personal/order',
                component: 'personal/order',
                title: '订单页',
            },
            {
                path: '/personal/profile',
                component: 'personal/profile',
                title: '订单页',
            },
        ],
    },
    {
        path: '*',
        component: '404',
        title: '404',
    },
]

export default routes
