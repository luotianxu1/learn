import Vue from 'vue'
import VueRouter from '@/vue-router'
import Home from '../view/home.vue'
import About from '../view/about.vue'
import A from '../view/a.vue'
import B from '../view/b.vue'

Vue.use(VueRouter) // 注册两个全局组件  install(Vue)

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/about',
        component: About,
        children: [
            {
                path: 'a',
                component: A,
            },
            {
                path: 'b',
                component: B,
            },
        ],
    },
]

const router = new VueRouter({
    mode: 'hash',
    routes: routes,
})

router.matcher.addRoutes([
    {
        path: '/auth',
        component: A,
    },
])

// 导航被触发
// 在失活的组件里调用beforeRouteLeava守卫
// 调用全局的beforeEach
// 在重用的组件里调用beforeRouteUpdate守卫
// 在路有配置里调用beforeEnter
// 解析异步路有组件
// 在被激活的组件里调用beforeRouteEnter
// 调用全局的beforeResolve守卫
// 导航被确认
// 调用全局的afterEach钩子
// 触发Dom更新
// 调用beforeRouteEnter守卫中传给next的回调函数，创建好的组件实例会作为回调函数的参数传入

export default router
