const url = require('url')
const Layer = require('./layer')
const Route = require('./route')
const methods = require('methods')

function Router() {
    this.stack = []
}

Router.prototype.route = function (path) {
    let route = new Route()
    let layer = new Layer(path, route.dispatch.bind(route)) // 给当前调用get方法 放入一层
    layer.route = route // 每个层都有一个route属性
    this.stack.push(layer)
    return route
}

// 中间件会放到当前路由系统中
Router.prototype.use = function (path, handler) {
    if (typeof path === 'function') {
        handler = path // 给path默认值
        path = '/'
    }
    let layer = new Layer(path, handler)
    layer.route = undefined // 如果route是undefined 说明他是中间件
    this.stack.push(layer)
}

methods.forEach((method) => {
    Router.prototype[method] = function (path, handlers) {
        let route = this.route(path) // 构建一个route
        route.get(handlers)
    }
})

Router.prototype.handle = function (req, res, out) {
    let { pathname } = url.parse(req.url)
    // express  需要通过next函数来迭代
    let idx = 0
    let dispatch = (err) => {
        if (idx === this.stack.length) return out()
        let layer = this.stack[idx++]

        // 用户传入了错误属性
        if (err) {
            // 2种可能 1 错误中间件 2 普通中间件
            if (!layer.route) {
                layer.handle_error(err, req, res, dispatch)
            } else {
                dispatch(err) // 是路由直接忽略
            }
        } else {
            // layer有可能是中间件，还有可能是方法
            if (layer.match(pathname)) {
                // 如果是中间件，直接执行对应的方法
                if (!layer.route && layer.handler.length !== 4) {
                    layer.handle_request(req, res, dispatch)
                } else {
                    if (layer.route.methods[req.method.toLowerCase()]) {
                        req.params = layer.params
                        layer.handle_request(req, res, dispatch)
                    } else {
                        dispatch()
                    }
                }
            } else {
                dispatch()
            }
        }
    }
    dispatch()
}

module.exports = Router
