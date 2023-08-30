import { ShapeFlags, isNumber, isString } from '@vue/shared'
import { Fragment, Text, createVNode } from './createVNode'
import { getSequence } from './sequence'

export function isSameVnode(v1, v2) {
    return v1.type === v2.type && v1.key === v2.key
}

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

    function mountElement(vnode, container, anchor) {
        const { type, props, children, shapeFlag } = vnode
        // 因为我们后续需要比对虚拟节点的差异，所以需要保留对应的真实节点
        const el = (vnode.el = hostCreateElement(type))

        if (props) {
            for (let key in props) {
                pathProps(undefined, props, el)
            }
        }

        if (children) {
            if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
                hostSetElementText(el, children)
            }
            if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
                mountChildren(children, el)
            }
        }

        hostInsert(el, container, anchor)
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

    function unmountChildren(children) {
        children.forEach((child) => {
            unmount(child)
        })
    }

    function patchKeydChildren(c1, c2, el) {
        // 比较c1和c2两个数组之间的差异 再去更新el
        let i = 0
        let e1 = c1.length - 1
        let e2 = c2.length - 1

        // async 从头
        // 有任何一方比对完成后就无需再比对
        while (i <= e1 && i <= e2) {
            const n1 = c1[i]
            const n2 = c2[i]
            if (isSameVnode(n1, n2)) {
                patch(n1, n2, el)
            } else {
                break
            }
            i++
        }

        // sync from end
        while (i <= e1 && i <= e2) {
            const n1 = c1[e1]
            const n2 = c2[e2]
            if (isSameVnode(n1, n2)) {
                patch(n1, n2, el)
            } else {
                break
            }
            e1--
            e2--
        }

        // 当i的值大于e1说明，老的全部完成对比，但是新的还有剩余
        // i到e2之前到内容就是要新增的
        if (i > e1) {
            // 新的多老的少
            while (i <= e2) {
                const nextPos = e2 + 1
                const anchor = c2[nextPos]?.el // 获取下一个元素的el
                // 我得知道是向前插入 还是向后插入，如果是向前插入得有参照物
                patch(null, c2[i], el, anchor)
                i++
            }
        } else if (i > e2) {
            // 老的多，新的少
            while (i <= e1) {
                unmount(c1[i])
                i++
            }
        } else {
            // --- 以上的情况 就是一些头尾的特殊操作，但是不适用其他情况----
            let s1 = i
            let s2 = i

            const keyToNewIndexMap = new Map()

            const toBePatched = e2 - s2 + 1 // 新的儿子有这个么多个需要被patch

            for (let i = s2; i <= e2; i++) {
                keyToNewIndexMap.set(c2[i].key, i)
            }

            const seq = new Array(toBePatched).fill(0)

            for (let i = s1; i <= e1; i++) {
                const vnode = c1[i]
                let newIndex = keyToNewIndexMap.get(vnode.key)
                if (newIndex == undefined) {
                    // 老的里面有的新的没用
                    unmount(vnode)
                } else {
                    // 新的老的都有，就记录下来当前对应的索引，就可以判断出哪些元素不需要移动了
                    // 用新的位置和老的位置做一个关联
                    // 让被patched过的索引用老节点的索引作为标识，防止出现0的情况 + 1
                    seq[newIndex - s2] = i + 1
                    // 用老的虚拟节点 c和新的虚拟节点做比对
                    patch(vnode, c2[newIndex], el) // 这里只是比较自己的属性和儿子，并没有移动
                }
            }

            let incr = getSequence(seq)

            let j = incr.length - 1

            // 需要按照新的位置重新排列，并且需要将新增元素添加上
            for (let i = toBePatched - 1; i >= 0; i--) {
                const currentIndex = s2 + i
                const child = c2[currentIndex]

                const anchor =
                    currentIndex + 1 < c2.length
                        ? c2[currentIndex + 1].el
                        : null
                if (seq[i] == 0) {
                    patch(null, child, el, anchor)
                } else {
                    if (i !== incr[j]) {
                        hostInsert(child.el, el, anchor)
                    } else {
                        j--
                    }
                }
            }
        }
    }

    function patchChildren(n1, n2, el) {
        let c1 = n1.children
        let c2 = n2.children

        const prevShapeFlag = n1.shapeFlag
        const shapeFlag = n2.shapeFlag

        // 开始比较儿子的情况
        /**
         * 新的       旧的
         * 文本       数组  (删除老儿子，设置文本内容)
         * 文本       文本  （更新文本内容）
         * 文本       空    （更新文本即可）
         * 数组       数组      （diff）
         * 数组       文本      （清空文本，进行挂载）
         * 空         数组      （删除所有儿子）
         * 空         文本      （清空文本）
         * 空         空        （无需处理）
         */

        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            // hello   = [span,span]
            if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
                // 老的是数组 ， 都移除即可
                unmountChildren(c1)
            }
            // 新的是文本 老的可能是文本、或者空
            if (c1 !== c2) {
                hostSetElementText(el, c2)
            }
        } else {
            // 之前是数组
            if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
                if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
                    // 双方都是数组   核心diff算法  ?? todo,,,
                    patchKeydChildren(c1, c2, el)
                } else {
                    // 现在是空的情况
                    unmountChildren(c1)
                }
            } else {
                // 老的是文本 或者空
                if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
                    hostSetElementText(el, '')
                }
                if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
                    mountChildren(c2, el)
                }
            }
        }
    }

    function patchElement(n1, n2) {
        // n1和n2能复用说明dom节点就不用删除了
        let el = (n2.el = n1.el) // 1.节点服用
        let oldProps = n1.props
        let newProps = n2.props
        pathProps(oldProps, newProps, el) // 2.比较属性
        patchChildren(n1, n2, el) // 3.比较儿子
    }

    const processElement = (n1, n2, container, anchor) => {
        if (n1 == null) {
            mountElement(n2, container, anchor)
        } else {
            // 元素更新了, 属性变化。 更新属性
            patchElement(n1, n2)
        }
    }

    const processFragment = (n1, n2, el) => {
        if (n1 == null) {
            mountChildren(n2.children, el)
        } else {
            patchKeydChildren(n1.children, n2.children, el)
        }
    }

    function unmount(vnode) {
        const { shapeFlag, type, children } = vnode

        if (type === Fragment) {
            return unmountChildren(children)
        }
        hostRemove(vnode.el)
    }

    function patch(n1, n2, container, anchor = null) {
        // 判断标签名和对应的key 如果一样 说明是同一个节点 div key
        if (n1 && !isSameVnode(n1, n2)) {
            unmount(n1)
            n1 = null // 将n1重置为null 此时会走n2的初始化
        }

        // 看n1 如果是null 说明没有之前的虚拟节点
        // 看n1 如果有值，说明要走diff算法
        const { type, shapeFlag } = n2
        switch (type) {
            case Text:
                processText(n1, n2, container)
                break
            case Fragment:
                processFragment(n1, n2, container)
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
            if (container._vnode) {
                unmount(container._vnode)
            }
        } else {
            patch(container._vnode || null, vnode, container)
        }
        container._vnode = vnode
    }
    return {
        render,
    }
}
