import { patchAttr } from './modules/attr'
import { patchClass } from './modules/class'
import { patchEvent } from './modules/event'
import { patchStyle } from './modules/style'

// class 、 style 、 事件 、 普通属性 （表单属性 true-value）
export function patchProp(el, key, prevVal, nextVal) {
    if (key === 'class') {
        patchClass(el, nextVal) // 对类名的处理
    } else if (key === 'style') {
        patchStyle(el, prevVal, nextVal)
    } else if (/^on[^a-z]/.test(key)) {
        // onClick ()=>{}
        patchEvent(el, key, nextVal)
    } else {
        patchAttr(el, key, nextVal)
    }
}
