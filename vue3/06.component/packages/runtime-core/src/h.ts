import { isObject } from '@vue/shared'
import { createVNode, isVNode } from './createVNode'

export function h(type, propsOrChildren?, children?) {
    // h方法如果参数为两个的情况 1）元素+属性 2）元素+儿子
    const l = arguments.length
    if (l === 2) {
        // h(type,属性或者元素对象)
        if (isObject(propsOrChildren) && !Array.isArray(propsOrChildren)) {
            // 要么是元素对象 要么是属性
            // h(type,元素对象)
            if (isVNode(propsOrChildren)) {
                // 是儿子的情况
                return createVNode(type, null, [propsOrChildren])
            }
            // 是属性的情况
            // h(type,属性)
            return createVNode(type, propsOrChildren)
        } else {
            // 属性+儿子情况
            // h(type,[]) h(type,'文本')
            return createVNode(type, null, propsOrChildren)
        }
    } else {
        // h(type,属性，儿子)
        if (l === 3 && isVNode(children)) {
            children = [children]
        } else if (l > 3) {
            // h(type,属性，儿子数组)
            children = Array.from(arguments).slice(2)
        }
        return createVNode(type, propsOrChildren, children)
    }
}
