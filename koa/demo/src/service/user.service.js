const User = require('../model/user.model')

// Service 处理了业务逻辑
class UserService {
    async createUser(user_name, password) {
        const userData = { user_name, password }
        const res = await User.create(userData)
        return res
    }

    // 查询 用户名是否存在， true
    async getUerInfo({ id, user_name, password, is_admin }) {
        const whereOpt = {}
        id && Object.assign(whereOpt, { id })
        user_name && Object.assign(whereOpt, { user_name })
        // User.findOne 查询 用户名是否存在
        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: whereOpt,
        })
        return res ? res.dataValues : null
    }
}

module.exports = new UserService()
