import { ShapeFlags, isNumber, isString } from '@vue/shared'
import { Text, createVNode } from './createVNode'

// 用户可以调用此方法传入对应的渲染选项
export function createRenderer(options) {
    let {
        createElement: hostCreateElement,
        createTextNode: hostCreateTextNode,
        insert: hostInsert,
        remove: hostRemove,
        querySelector: hostQuerySelector,
        parentNode: hostParentNode,
        nextSibling: hostNextSibling,
        setText: hostSetText,
        setElementText: hostSetElementText,
        patchProp: hostPatchProp,
    } = options

    function normalize(children, i) {
        if (isString(children[i]) || isNumber(children[i])) {
            children[i] = createVNode(Text, null, children[i])
        }
        return children[i]
    }

    function mountChildren(children, container) {
        for (let i = 0; i < children.length; i++) {
            let child = normalize(children, i)
            // child可能是文本内容，我们需要把文本内容转为虚拟节点
            patch(null, child, container)
        }
    }

    function pathProps(oldProps, newProps, el) {
        if (oldProps == null) oldProps = {}
        if (newProps == null) newProps = {}
        // 新的覆盖老的
        for (let key in newProps) {
            hostPatchProp(el, key, oldProps[key], newProps[key])
        }
        // 老的有的新的没有要删除
        for (let key in oldProps) {
            if (newProps[key] == null) {
                hostPatchProp(el, key, oldProps[key], null)
            }
        }
    }

    function mountElement(vnode, container) {
        const { type, props, children, shapeFlag } = vnode
        // 因为我们后续需要比对虚拟节点的差异，所以需要保留对应的真实节点
        const el = (vnode.el = hostCreateElement(type))

        // if (props) {
        //     for (let key in props) {
        //         pathProps(undefined, props, el)
        //     }
        // }

        if (children) {
            if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
                hostSetElementText(el, children)
            }
            if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
                mountChildren(children, el)
            }
        }

        hostInsert(el, container)
    }

    const processText = (n1, n2, el) => {
        if (n1 == null) {
            hostInsert((n2.el = hostCreateTextNode(n2.children)), el)
        } else {
            let el = (n2.el = n1.el) // 复用文本
            if (n1.children === n2.children) {
                return
            }
            hostSetText(el, n2.children)
        }
    }

    const processElement = (n1, n2, container, anchor) => {
        if (n1 == null) {
            mountElement(n2, container)
        } else {
            // 元素更新了, 属性变化。 更新属性
            //   patchElement(n1, n2);
        }
    }

    function patch(n1, n2, container, anchor = null) {
        // 看n1 如果是null 说明没有之前的虚拟节点
        // 看n1 如果有值，说明要走diff算法
        // if (n1 == null) {
        // mountElement(n2, container)
        // }

        const { type, shapeFlag } = n2
        switch (type) {
            case Text:
                processText(n1, n2, container)
                break
            // case Fragment:
            //   processFragment(n1, n2, container);
            default:
                if (shapeFlag & ShapeFlags.ELEMENT) {
                    // 元素的处理
                    processElement(n1, n2, container, anchor)
                } else if (shapeFlag & ShapeFlags.COMPONENT) {
                    // processComponent(n1, n2, container, anchor)
                }
        }
    }

    // options就是用户自己 渲染的时候可以决定有哪些方法
    function render(vnode, container) {
        if (vnode == null) {
            // 卸载元素
        } else {
            patch(container._vnode || null, vnode, container)
        }
        container._vnode = vnode
    }
    return {
        render,
    }
}
