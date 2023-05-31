export function renderMixin(Vue) {
    // 创建元素
    Vue.prototype._c = function () {
        return createElement(this, ...arguments)
    }
    // 创建虚拟dom文本元素
    Vue.prototype._v = function (text) {
        return createTextElement(this, text)
    }
    // stringity
    Vue.prototype._s = function (val) {
        if (typeof val == 'object') return JSON.stringify(val)
        return val
    }
    Vue.prototype._render = function () {
        const vm = this
        let render = vm.$options.render // 就是我们解析出来的render方法，同时也有可能是用户写的
        let vnode = render.call(vm)
        console.log(vnode)
        return vnode
    }
}

export function createElement(vm, tag, data = {}, ...children) {
    return vnode(vm, tag, data, data.key, children, undefined)
}

export function createTextElement(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text)
}

function vnode(vm, tag, data, key, children, text) {
    return {
        vm,
        tag,
        data,
        key,
        children,
        text,
        // .....
    }
}
