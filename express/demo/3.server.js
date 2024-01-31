// 中间件的概念 控制是否向下执行（权限处理）
// 中间件 可以扩展req和res中的方法
// 中间件一般放在路由之前
// 中间件 可以提前处理一些逻辑和koa用法一样

const express = require('./express')

const app = express()

// express中的中间件可以防止路径 这个路径的规则和cookie中的path一样{path:'/a}

app.use(function (req, res, next) {
    req.a = 1
    next()
})

app.use('/', function (req, res, next) {
    req.a++
    next()
})

app.use('/a', function (req, res, next) {
    req.a++
    next()
})

app.use('/a', function (req, res, next) {
    res.end(req.a + '')
})

app.use('/', function (req, res, next) {
    res.end(req.a + '')
})

app.listen(3002)
