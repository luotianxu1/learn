// vue vue-server-renderer
// koa @koa/router

const Vue = require('vue')
const fs = require('fs')
const path = require('path')
const VueServerRender = require('vue-server-renderer')

const vm = new Vue({
    data() {
        return {
            name: 'luo',
            age: 24,
        }
    },
    template: `<div>{{name}}今年{{age}}岁了</div>`,
})

const Koa = require('koa')
const Router = require('@koa/router')
const template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
const render = VueServerRender.createRenderer({
    template, // 采用哪个模板去渲染
})

let app = new Koa() // 产生一个app实例
let router = new Router() // 产生一个路由实例

router.get('/', async (ctx) => {
    ctx.body = await render.renderToString(vm)
})

app.use(router.routes()) // 将路由注册到应用上
app.listen(3001) // 监听3000端口
