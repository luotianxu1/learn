const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const userRouter = require('../router/user.router-two')

// 处理提交事件
const errorHandler = require('./errorHandler')

const app = new Koa()

app.use(bodyParser())
app.use(userRouter.routes())

app.on('error', errorHandler)

module.exports = app
