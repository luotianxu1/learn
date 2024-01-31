const url = require('url')
const Layer = require('./layer')
const Route = require('./route')
const methods = require('methods')

// express.Router 返回的结果会放到use上
function Router() {
    // 当中间件匹配到后会执行次方法，需要去当前stack中一次取出来执行，如果处理不了调用next会继续找下一个中间件
    let router = (req, res, next) => {
        router.handle(req, res, next)
    }
    router.stack = []
    router.__proto__ = proto
    return router
}

let proto = {}
proto.route = function (path) {
    let route = new Route()
    let layer = new Layer(path, route.dispatch.bind(route)) // 给当前调用get方法 放入一层
    layer.route = route // 每个层都有一个route属性
    this.stack.push(layer)
    return route
}

// 中间件会放到当前路由系统中
proto.use = function (path, handler) {
    if (typeof path === 'function') {
        handler = path // 给path默认值
        path = '/'
    }
    let layer = new Layer(path, handler)
    layer.route = undefined // 如果route是undefined 说明他是中间件
    this.stack.push(layer)
}

methods.forEach((method) => {
    proto[method] = function (path, handlers) {
        let route = this.route(path) // 构建一个route
        route[method](handlers)
    }
})

proto.handle = function (req, res, out) {
    let { pathname } = url.parse(req.url)
    // express  需要通过next函数来迭代
    let idx = 0
    let removed = ''
    let dispatch = (err) => {
        if (idx === this.stack.length) return out()
        if (removed) {
            req.url = removed + req.url
        }
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
                    // 在这里吧中间件的路径删除掉
                    if (layer.path !== '/') {
                        removed = layer.path
                        req.url = req.url.substr(removed.length)
                    }
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
