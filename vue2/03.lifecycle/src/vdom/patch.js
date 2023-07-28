// 将虚拟节点转换成真实节点
// oldVnode => id#app
// vnode 我们根据模板生成的虚拟dom
export function patch(oldVnode, vnode) {
    if (oldVnode.nodeType == 1) {
        // 用vnode  来生成真实dom 替换原本的dom元素
        const parentElm = oldVnode.parentNode // 找到他的父亲
        let elm = createElm(vnode) //根据虚拟节点 创建元素
        parentElm.insertBefore(elm, oldVnode.nextSibling)

        parentElm.removeChild(oldVnode)

        return elm
    }
}

function createElm(vnode) {
    let { tag, data, children, text, vm } = vnode
    if (typeof tag === 'string') {
        // 元素
        vnode.el = document.createElement(tag) // 虚拟节点会有一个el属性 对应真实节点

        // 只有元素才有属性
        updateProperties(vnode)

        children.forEach((child) => {
            vnode.el.appendChild(createElm(child))
        })
    } else {
        vnode.el = document.createTextNode(text)
    }
    return vnode.el
}

function updateProperties(vnode) {
    let el = vnode.el
    let newProps = vnode.data || {}
    for (let key in newProps) {
        if (key == 'style') {
            for (let styleName in newProps.style) {
                el.style[styleName] = newProps.style[styleName]
            }
        } else if (key == 'class') {
            el.className = newProps.class
        } else {
            el.setAttribute(key, newProps[key])
        }
    }
}
