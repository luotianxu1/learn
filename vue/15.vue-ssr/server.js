// vue vue-server-renderer
// koa @koa/router

const Vue = require('vue')
const fs = require('fs')
const path = require('path')
const VueServerRender = require('vue-server-renderer')
const Koa = require('koa')
const Router = require('@koa/router')
const static = require('koa-static')

let app = new Koa() // 产生一个app实例
let router = new Router() // 产生一个路由实例

const serverBundle = require('./dist/vue-ssr-server-bundle.json')

const template = fs.readFileSync(
    path.resolve(__dirname, 'dist/index.ssr.html'),
    'utf8'
)

const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const render = VueServerRender.createBundleRenderer(serverBundle, {
    template,
    clientManifest, // 通过后端注入前端js脚本
})

router.get('/', async (ctx) => {
    ctx.body = await new Promise((resolve, reject) => {
        render.renderToString({ url: ctx.url }, (err, html) => {
            if (err) reject(err)
            resolve(html)
        })
    })
    //    const html = await render.renderToString(); // 生成字符串
})
router.get('/(.*)', async (ctx) => {
    console.log('跳转')
    ctx.body = await new Promise((resolve, reject) => {
        render.renderToString({ url: ctx.url }, (err, html) => {
            // 通过服务端渲染 渲染后返回
            if (err && err.code == 404) resolve(`not found`)
            console.log(html)
            resolve(html)
        })
    })
})
app.use(static(path.resolve(__dirname, 'dist')))
app.use(router.routes()) // 将路由注册到应用上
app.listen(3001) // 监听3000端口
