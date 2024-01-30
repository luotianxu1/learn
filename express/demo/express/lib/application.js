const http = require('http')
const Router = require('./router')
const methods = require('methods')

function Applicaion() {}

Applicaion.prototype.lazy_route = function () {
    if (!this._router) {
        this._router = new Router()
    }
}

Applicaion.prototype.use = function (path, handler) {
    this.lazy_route()
    this._router.use(path, handler)
}

methods.forEach((method) => {
    Applicaion.prototype[method] = function (path, ...handlers) {
        this.lazy_route()
        this._router[method](path, handlers)
    }
})

Applicaion.prototype.listen = function () {
    let server = http.createServer((req, res) => {
        // 应用提供一个找不到的方法，如果路由内部无法匹配，调用次方法即可
        function done() {
            res.end(`Connot ${req.method} ${req.url}`)
        }
        this.lazy_route()
        this._router.handle(req, res, done)
    })
    server.listen(...arguments)
}

module.exports = Applicaion
