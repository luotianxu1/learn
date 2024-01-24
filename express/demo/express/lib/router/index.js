const url = require('url')

function Router() {
    this.stack = []
}

Router.prototype.get = function (path, handler) {
    this.stack.push({
        path,
        handler,
        method: 'get',
    })
}

Router.prototype.handle = function (req, res, out) {
    let { pathname } = url.parse(req.url)
    let requestMethod = req.method.toLowerCase()

    // 遍历路由栈
    for (let i = 0; i < this.stack.length; i++) {
        let { method, handler, path } = this.stack[i]
        if ((method === requestMethod && pathname) === path) {
            return handler(req, res)
        }
    }
    out()
}

module.exports = Router
