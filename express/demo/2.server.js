// 内部不是es6的写法 构造函数
// express是一个函数，可以调用这个函数创建一个应用
const express = require('./express')

const app = express() // 创建应用

app.get('/', function (req, res) {
    res.end('/')
})

app.get('/hello', function (req, res) {
    res.end('hello')
})

app.listen(3000)
