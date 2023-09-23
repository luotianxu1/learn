import Home from '../views/home.vue'
import About from '../views/about.vue'
import { createRouter,createWebHashHistory,createWebHistory } from '../vue-router'
import { h } from 'vue'

const routes = [
    {
        path:'/',
        component: Home,
        beforeEnter(){
            console.log('enter')
        },
        children:[
            {
                path:'a',
                component:{
                    render:()=> h('h1','hello a')
                }
            },
            {
                path:'b',
                component:{
                    render:()=> h('h1','hello b')
                }
            }
        ]
    },
    {
        path:'/about',
        component: About
    }
]
const router = createRouter({
    routes,
    history:createWebHistory()
})


router.beforeEach((to,from,next)=>{
   return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('before')
            resolve()
        }, 1000);
   })
})
router.beforeEach(async (to,from,next)=>{
    return new Promise((resolve,reject)=>{
         setTimeout(() => {
             console.log('before')
             resolve()
         }, 1000);
    })
 })
router.afterEach((to,from,next)=>{
   console.log('after1')
})
router.afterEach((to,from,next)=>{
    console.log('after2')
 })
router.beforeResolve((to,from,next)=>{
    console.log('beforeResolve')
 })
// app.use(router)
export default router
// 路由的条状方式： hash路由  history路由  memory不算前端路由 不会发生路由地址变化
// hash值变化 不会重新加载页面 # 很丑，上线都不采用hash的方式
// hash 就是前端的锚点，监控锚点的变化 渲染对应的组件， 他不会像服务端发请求, 不会像服务端发起请求 不能做seo优化
// > window.location.hash   onhashchange


// history 当刷新的时候 会真的像服务端请求资源， 如果正常来说服务端是没有这个资源的。 vite是一个静态服务度，检测如果页面不存在，会帮你指定到首页,根据vue-router渲染出对应的页面 -》 服务端 指定首页,在二次渲染来解决的  （可能会有404的问题）  可以真的像服务端发请求，支持服务渲染的
// > window.history.pushState()    on('popstate')


// 通过historyAPI可以实现模式，都采用history的方式来实现

// vue-router 是通过注入的方式来实现的 （底层封装一个公告的history）






