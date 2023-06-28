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

export default router
