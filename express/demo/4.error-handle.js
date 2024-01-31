const express = require('./express')

const app = express()

app.use(function (req, res, next) {
    let flag = Math.random() > 0.5
    if (flag) {
        return next('出错了')
    }
    next()
})

app.get('/', function (req, res, next) {
    console.log('/1')
    next()
})

app.get('/', function (req, res, next) {
    console.log('/2')
    res.end('/')
})

app.use((error, req, res, next) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end(error)
})

app.listen(3001)
