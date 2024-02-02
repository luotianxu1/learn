const { getUerInfo } = require('../service/user.service')
const {
    userFormateError,
    userAlreadyExited,
    userDoesNotExist,
    invalidPassword,
    userLoginError,
    tokenExpiredError,
    invalidToken,
} = require('../constant/err.type')
const bcryptjs = require('bcryptjs')
const { JWT_SECRET } = require('../config/config_default')

const userValidator = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    // 合法性
    if (!user_name || !password) {
        console.error('用户名或密码为空', ctx.request.body)
        // 抛出给下方报错的地方
        ctx.app.emit('error', userFormateError, ctx)
        return
    }

    await next()
}

const verifyUser = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    try {
        const res = await getUerInfo({ user_name: user_name })
        if (res) {
            // 抛出给报错的地方
            ctx.app.emit('error', userAlreadyExited, ctx)
            return
        }
    } catch (err) {
        console.error('获取用户信息错误', err)
        ctx.app.emit('error', userAlreadyExited, ctx)
        return
    }
    await next()
}

const crpyPassword = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    const salt = bcryptjs.genSaltSync(10)
    const hash = bcryptjs.hashSync(password, salt)
    ctx.request.body.password = hash
    await next()
}

const crpytLogin = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    try {
        const res = await getUerInfo({ user_name: user_name })
        if (!res) {
            console.error('用户名不存在', { user_name })
            ctx.app.emit('error', userDoesNotExist, ctx)
            return
        }
        if (!bcryptjs.compareSync(password, res.password)) {
            ctx.app.emit('error', invalidPassword, ctx)
            return
        }
    } catch (err) {
        console.error('获取用户信息错误', err)
        return ctx.app.emit('error', userLoginError, ctx)
        return
    }
    await next()
}

const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    console.log(token)

    try {
        // user中包含了payload的信息(id, user_name, is_admin)
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    } catch (err) {
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token已过期', err)
                return ctx.app.emit('error', tokenExpiredError, ctx)
            case 'JsonWebTokenError':
                console.error('无效的token', err)
                return ctx.app.emit('error', invalidToken, ctx)
        }
    }

    await next()
}

module.exports = {
    userValidator,
    verifyUser,
    crpyPassword,
    crpytLogin,
    auth,
}
