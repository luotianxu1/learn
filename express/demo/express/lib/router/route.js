// 每个层都有一个route属性
const Layer = require('./layer')
const methods = require('methods')

function Route() {
    this.stack = []
    // 用于匹配路径的时候加速匹配，如果没有次方法的处理，直接跳过
    this.methods = {} // 表示当前route中有哪些方法{get:true,post:true}
}

Route.prototype.dispatch = function (req, res, out) {
    let idx = 0
    let method = req.method.toLowerCase()
    let dispatch = (err) => {
        if (err) return out(err)
        if (idx === this.stack.length) return out()
        let layer = this.stack[idx++]
        if (layer.method === method) {
            layer.handle_request(req, res, dispatch.bind(this))
        } else {
            dispatch()
        }
    }
    dispatch()
}

methods.forEach((method) => {
    Route.prototype[method] = function (handlers) {
        handlers.forEach((handler) => {
            let layer = new Layer('/', handler)
            layer.method = method
            this.methods[method] = true // 如果用户绑定方法，记录一下
            this.stack.push(layer)
        })
    }
})

module.exports = Route
