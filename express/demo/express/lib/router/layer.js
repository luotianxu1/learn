// 每次存储时一个对象
function Layer(path, handler) {
    this.path = path
    this.handler = handler
}

Layer.prototype.match = function (pathname) {
    if (this.path === pathname) {
        return true
    }
    // 如果是中间件，要特殊处理
    if (!this.route) {
        // 说明是中间件
        if (this.path === '/') {
            return true
        }
        return pathname.startsWith(this.path + '/')
    }
}
Layer.prototype.handle_error = function (err, req, res, next) {
    //  如果参数的个数是4个，说明找到了错误处理中间件
    if (this.handler.length === 4) {
        return this.handler(err, req, res, next)
    } else {
        // 如果没找到继续向下找
        next(err)
    }
}
Layer.prototype.handle_request = function (req, res, next) {
    this.handler(req, res, next)
}

module.exports = Layer
