import Vue from 'vue'
import App from './App.vue'
import createRouter from './create-router'

export default () => {
    const router = createRouter()
    const app = new Vue({
        router,
        render: (h) => h(App),
    })

    return { app, router }
}

// 1、以前代码在前端跑到时候，每个客户端访问都有一个独立的实例
// 2、每次客户端访问都要产生一个新的实例 这里导出一个函数
