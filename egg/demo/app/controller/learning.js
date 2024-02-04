const { Controller } = require('egg')

class Learning extends Controller {
    // async index() {
    //     const { ctx } = this
    //     console.log(ctx.request.body)
    //     ctx.body = {
    //         message: '查询成功Post',
    //         code: 200,
    //         list: [ctx.request.body],
    //     }
    // }
    async index() {
        const { ctx } = this
        const res = await ctx.service.product.index()
        ctx.body = res
    }
}

module.exports = Learning
