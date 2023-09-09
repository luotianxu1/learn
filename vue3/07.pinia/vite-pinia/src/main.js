import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from '@/pinia'

// 原因就是 因为一切从组件开始
const app = createApp(App)
const pinia = createPinia()
pinia.use(function (store) {
    // 每个store 都要执行 要通过store名字来区分

    let local = localStorage.getItem(store.id + 'PINIA_STATE')
    if (local) {
        store.$state = JSON.parse(local)
    }

    store.$subscribe((state) => {
        localStorage.setItem(store.id + 'PINIA_STATE', JSON.stringify(state))
    })
})
app.use(pinia) // 会调用这个插件的install方法

app.mount('#app')

// vuex优点？ 数据共享 （每个模块 有自己的共享数据  模块的拆分 namespace） $store.state.a.b.c.xxx  弱化命名空间的概念
// vuex优点就是可以封装公共的逻辑， mutation和action区别  mutation（统一提交状态）  action（封装一些一些公共的异步逻辑）
// 例如我有一个统一的修改逻辑 （没有异步，要不写action呢？）

// pinia 优点： 体积小 基于ts
// 没有命名空间，可以创建多个store 来进行统一管理数据
// 只有action没有mutation了

// 注册的插件 每个store都会应用一下
