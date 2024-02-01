var express = require('express')

var router = express.Router()

const fw1 = function (req, res, next) {
    console.log('全局中间件1')
    next()
}

const fw2 = function (req, res, next) {
    console.log('全局中间件2')
    next()
}

router.get('/', (req, res) => {
    console.log('get')
    // 请求对象
    // console.log(req)

    // 响应对象
    res.set({ aaHeader: 'bbHeader' })
    // res.status(201).send({ name: '小明' })
    // res.end()
    res.status(500)
    res.send('错误')
    throw new Error('错误')
})

router.post('/', [fw1, fw2], (req, res) => {
    console.log('post')
    res.send('post')
})

router.put('/', (req, res) => {
    console.log('put')
    res.send('put')
})

router.delete('/', (req, res) => {
    console.log('delete')
    res.send('delete')
})

module.exports = router
