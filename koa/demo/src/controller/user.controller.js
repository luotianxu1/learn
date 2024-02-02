const { createUser, getUerInfo } = require('../service/user.service')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config_default')

// 发起请求 -》 controller -》 service --》 model -》 操作数据 -》
//使用了 sequelize 完成对数据的保存操作
class UserController {
    // 方法被 async 修饰了，调用处必须加上await
    async register(ctx, next) {
        // 1. 获取数据
        const { user_name, password } = ctx.request.body

        // 2. 操作数据库
        const res = await createUser(user_name, password)

        // 3. 返回结果
        ctx.body = {
            code: 0,
            message: '用户注册成功',
            result: {
                id: res.id,
                user_name: res.user_name,
            },
        }
    }

    async login(ctx, next) {
        const { user_name } = ctx.request.body

        // 1. 获取用户信息(在token的payload中, 记录id, user_name, is_admin)
        try {
            // 从返回结果对象中剔除password属性, 将剩下的属性放到res对象
            const { password, ...res } = await getUerInfo({ user_name })

            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
                },
            }
        } catch (err) {
            console.error('用户登录失败', err)
        }
    }
}

module.exports = new UserController()
