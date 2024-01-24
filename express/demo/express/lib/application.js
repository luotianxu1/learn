const http = require('http')
const Router = require('./router')

function Applicaion() {
    this._router = new Router()
}

Applicaion.prototype.get = function (path, handler) {
    this._router.get(path, handler)
}

Applicaion.prototype.listen = function () {
    let server = http.createServer((req, res) => {
        // 应用提供一个找不到的方法，如果路由内部无法匹配，调用次方法即可
        function done() {
            res.end(`Connot ${req.method} ${req.url}`)
        }
        this._router.handle(req, res, done)
    })
    server.listen(...arguments)
}

module.exports = Applicaion
