const Routes = require('koa-router')

const router = new Routes({ prefix: '/users' })

// 定义处理数据的函数
const handleData = (ctx, method, message) => {
    const data = {
        message,
        value: 'xx数据',
    }
    ctx.body = data
}

// 定义路由处理
router
    .get('/api/data', async (ctx) => {
        handleData(ctx, '查询成功', 'xx数据')
    })
    .post('/api/data', async (ctx) => {
        handleData(ctx, '创建成功', 'xx数据')
    })
    .put('/api/data', async (ctx) => {
        handleData(ctx, '修改成功', 'xx数据')
    })
    .delete('/api/data', async (ctx) => {
        handleData(ctx, '删除成功', 'xx数据')
    })

module.exports = router
