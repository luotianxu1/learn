const { Controller } = require('egg')

class Hello extends Controller {
    async index() {
        const { ctx } = this
        ctx.body = {
            message: '查询成功',
            code: 200,
            list: [
                {
                    id: 1,
                    name: '张三',
                },
            ],
        }
    }
    async listDetail() {
        const { ctx } = this
        // 获取get请求参数 /product/detail?id=123
        ctx.body = {
            message: '查询成功',
            code: 200,
            list: [
                {
                    id: `${ctx.query.id}`,
                    name: `张三${ctx.query.name}`,
                },
            ],
        }
    }
    async listDetailParams() {
        const { ctx } = this
        // 获取get请求参数 /product/detail/123
        ctx.body = {
            message: '查询成功',
            code: 200,
            list: [
                {
                    id: `${ctx.params.id}`,
                    name: `张三${ctx.params.name}`,
                },
            ],
        }
    }
}

module.exports = Hello
