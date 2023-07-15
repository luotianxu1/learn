import Vue from 'vue'
import App from './App.vue'
import createRouter from './create-router'

export default () => {
    const app = new Vue({
        el: '#app',
        render: (h) => h(App),
    })

    return { app }
}

// 1、以前代码在前端跑到时候，每个客户端访问都有一个独立的实例
// 2、每次客户端访问都要产生一个新的实例 这里导出一个函数
