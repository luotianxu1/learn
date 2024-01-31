const express = require('express')
const article = express.Router()

article.get('/add', function (req, res) {
    res.end('article add')
})

article.get('/remove', function (req, res) {
    res.end('article remove')
})

module.exports = article
