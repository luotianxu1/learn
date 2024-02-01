const express = require('express')
const router = express.Router()
const stuModel = require('../Models/stuModel')

const { body, validationResult } = require('express-validator')

// 获取所有学生信息：http://localhost:8089/student/search
router.get('/search', async (req, res, next) => {
    try {
        const result = await stuModel.findAll({ raw: true })
        res.json({
            code: 1001,
            msg: result,
        })
    } catch (err) {
        next(err)
    }
})

// 添加学生信息：http://localhost:8089/student/add
router.post(
    '/add',
    [
        //配置验证规则
        body('name')
            .notEmpty()
            .withMessage('用户名不能为空！')
            .custom(async (username) => {
                const user = await User.findOne({ username })
                if (user) return Promise.reject('用户名已存在')
            }),
        body('age').notEmpty().withMessage('密码不能为空！'),
        body('gender')
            .notEmpty()
            .withMessage('邮箱不能为空！')
            .isEmail()
            .withMessage('邮箱格式不正确！')
            .bail()
            .custom(async (email) => {
                const user = await User.findOne({ email })
                if (user) return Promise.reject('邮箱已经存在')
            }),
    ],
    async (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            })
        }
        next()
        try {
            const { id, name, age, gender } = req.body
            const result = await stuModel.create({ id, name, age, gender })
            res.json({
                code: 1001,
                msg: '插入成功',
            })
        } catch (err) {
            next(err)
        }
    }
)

// 删除学生信息：http://localhost:8089/student/delete
router.post('/delete', async (req, res, next) => {
    try {
        const { id } = req.body
        await stuModel.destroy({ where: { id } })
        res.json({
            code: 1001,
            msg: '删除成功',
        })
    } catch (err) {
        next(err)
    }
})

// 更新某条信息：http://localhost:8089/student/update
router.put('/update', async (req, res, next) => {
    try {
        const { id, name, age, gender } = req.body
        const user = await stuModel.findOne({ where: { id } })
        if (!user) {
            return res.json({
                code: 1002,
                msg: '查询失败',
            })
        }
        await user.update({ name, age, gender })
        res.json({
            code: 1001,
            msg: '更新成功',
        })
    } catch (err) {
        next(err)
    }
})

// 错误处理中间件
router.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({
        code: 1002,
        msg: '服务器发生错误',
    })
})

module.exports = router
