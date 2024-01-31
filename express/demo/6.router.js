const express = require('./express')

const app = express()

const user = express.Router()

user.get('/add', function (req, res) {
    res.end('user add')
})

user.get('/remove', function (req, res) {
    res.end('user remove')
})

const article = express.Router()

article.get('/add', function (req, res) {
    res.end('article add')
})

article.get('/remove', function (req, res) {
    res.end('article remove')
})

app.use('/user', user)
app.use('/article', article)

app.listen(3002)
