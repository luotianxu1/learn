// 带参数的路由 /name/:id/:age
const express = require('./express')

const app = express()

app.get('/zf/:id/:name', function (req, res) {
    console.log(req.params)
    res.end(JSON.stringify(req.params))
})

app.listen(3002)
