import { isObject, isReservedTag } from '../utils'

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
        return vnode
    }
}

export function createElement(vm, tag, data = {}, ...children) {
    // 如果是组件 产生虚拟节点时需要把组件的构造函数传入
    // new Ctor().$mount()
    // 根据tag名字 需要判断他是不是一个组件
    if (isReservedTag(tag)) {
        return vnode(vm, tag, data, data.key, children, undefined)
    } else {
        const Ctor = vm.$options.components[tag]
        // 创建组件的虚拟节点 children就是组件的插槽了
        return createComponent(vm, tag, data, data.key, children, Ctor)
    }
}

function createComponent(vm, tag, data, key, children, Ctor) {
    if (isObject(Ctor)) {
        Ctor = vm.$options._base.extend(Ctor) // Vue.extend
    }
    // 给组件增加生命周期
    data.hook = {
        init(vnode) {
            let child = (vnode.componentInstance = new Ctor({
                _isComponent: true,
            })) // new Sub 会用此选项和组件的配置进行合并
            child.$mount() // 组件挂载完成后 会在 vnode.componentInstance.$el => <button>
        },
    }
    let component = vnode(
        vm,
        `vue-component-${Ctor.cid}-${tag}`,
        data,
        key,
        undefined,
        undefined,
        { Ctor, children }
    )
    return component
}

export function createTextElement(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text)
}

function vnode(vm, tag, data, key, children, text, componentOptions) {
    return {
        vm,
        tag,
        data,
        key,
        children,
        text,
        componentOptions, //组件的虚拟节点多了一个componentOptions属性 用来保存当前组件的构造函数，和它的插槽
        // .....
    }
}
