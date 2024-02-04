const Controller = require('egg').Controller

class UserController extends Controller {
    async create() {
        const { ctx } = this
        const { name, age } = ctx.request.body
        try {
            const result = await this.app.mysql.insert('users', { name, age })
            ctx.body = result
        } catch (error) {
            ctx.status = 500
            ctx.body = error.message
        }
    }

    async delete() {
        const { ctx } = this
        const { id } = ctx.params
        try {
            const result = await this.app.mysql.delete('users', { id })
            ctx.body = result
        } catch (error) {
            ctx.status = 500
            ctx.body = error.message
        }
    }

    async update() {
        const { ctx } = this
        const { id } = ctx.params
        const { name, age } = ctx.request.body
        try {
            const result = await this.app.mysql.update(
                'users',
                { name, age },
                { where: { id } }
            )
            ctx.body = result
        } catch (error) {
            ctx.status = 500
            ctx.body = error.message
        }
    }

    async list() {
        const { ctx } = this
        const { name, age } = ctx.query
        const page = parseInt(ctx.query.page) || 1
        const size = parseInt(ctx.query.size) || 10
        const offset = (page - 1) * size

        const where = {}
        if (name) {
            where.name = name
        }
        if (age) {
            where.age = age
        }
        try {
            // const total = await this.app.mysql.count('users', { where }); // 获取总记录数

            const sql = `select count(*) from users`

            const totalResult = await this.app.mysql.query(sql)
            const total = totalResult[0]['count(*)']
            console.log(total)

            const totalPages = Math.ceil(total / size) // 计算总页数

            const result = await this.app.mysql.select('users', {
                where, // 添加查询条件
                orders: [['created_at', 'desc']], // 根据created_at字段的倒序（降序）排列
                limit: size,
                offset,
            })

            ctx.body = {
                data: result,
                total,
                totalPages,
                currentPage: page,
                pageSize: size,
            }
        } catch (error) {
            ctx.status = 500
            ctx.body = error.message
        }
    }
}

module.exports = UserController
