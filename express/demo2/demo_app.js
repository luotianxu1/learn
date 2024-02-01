const express = require('express')
const router = require('./demo_router')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 定义中间件
app.use(function (req, res, next) {
    console.log('全局中间件')
    next()
})

// 为所有路由加上前缀
app.use('/user', router)

// 错误处理中间件
// const errorfw = (err, res, req, next) => {
//     console.log('错误', err.message)
//     res.send('error')
//     next()
// }
// app.use(errorfw)

app.get('/apiTemple', (req, res) => {
    res.send(`<h1>Hello Word</h1>`)
})

// 内置中间件
app.use(express.static('resource'))

app.listen(3001, () => {
    console.log('hello word')
})
