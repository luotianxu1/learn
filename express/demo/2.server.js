const express = require('./express')

const app = express() // 创建应用

app.get(
    '/',
    function (req, res, next) {
        // 包含异步逻辑 await next()
        console.log(1)
        next()
    },
    function (req, res, next) {
        console.log(11)
        next()
    },
    function (req, res, next) {
        console.log(111)
        next()
    },
    function (req, res, next) {
        console.log(1111)
        next()
    }
)

app.get('/', function (req, res, next) {
    console.log(2)
    res.end('ok')
})

app.listen(3000)
