// 可以用异步组件来家在（靠的是webpack中的代码分割功能）
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Foo = () => import('./components/Foo.vue')
const Bar = () => import('./components/Bar.vue')

export default () => {
    const router = new VueRouter({
        mode: 'history',
        routes: [
            { path: '/', component: Foo },
            { path: '/foo', component: Foo },
            { path: '/bar', component: Bar },
        ],
    })
    return router
}
