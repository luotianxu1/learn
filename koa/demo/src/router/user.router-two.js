const Routes = require('koa-router')

const router = new Routes({ prefix: '/users' })
const { register, login } = require('../controller/user.controller')
const {
    userValidator,
    verifyUser,
    crpyPassword,
    crpytLogin,
    auth,
} = require('../middleware/user.middleware')

router.post(
    '/register',
    auth,
    userValidator,
    verifyUser,
    crpyPassword,
    register
)
router.post('/login', crpytLogin, login)

// 定义路由处理
router.get('/api/data', (ctx) => {
    const queryParam = ctx.request.query
    console.log(queryParam)
    const bodyParam = ctx.request.body
    console.log(bodyParam)
    // 设置响应类型
    ctx.response.status = 201
    // 设置响应类型
    ctx.response.type = 'application/json'
    // 设置响应头
    ctx.response.set('X-Custom-Header', 'Custom Value')
    // 发送响应
    ctx.response.body = { message: '请求成功' }
})

router.get('/', (ctx) => {
    ctx.body = 'Hello, World!'
})

module.exports = router
