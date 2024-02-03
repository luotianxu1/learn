const express = require('./express')

const app = express()

app.param('id', function (req, res, next, value, key) {
    req.params.id = value + 10
    next()
})

app.param('id', function (req, res, next, value, key) {
    req.params.id = value - 5
    next()
})

app.get('/zf/:id/:name', function (req, res, next) {
    res.end(JSON.stringify(req.params))
})

app.listen(3005)
