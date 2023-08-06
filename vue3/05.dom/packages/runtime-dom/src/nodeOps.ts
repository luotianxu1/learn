export const nodeOps = {
    // 创建元素
    createElement(tagname) {
        return document.createElement(tagname)
    },
    // 创建文本
    createTextNode(text) {
        return document.createTextNode(text)
    },
    // 对元素的插入
    insert(element, container, anchor = null) {
        container.insertBefore(element, anchor)
    },
    // 对元素的删除
    remove(child) {
        const parent = child.parentNode
        if (parent) {
            parent.removeChild(child)
        }
    },
    // 元素查询
    querySelector(selectors) {
        return document.querySelector(selectors)
    },
    // 获取父节点
    parentNode(child) {
        return child.parentNode
    },
    // 获取兄弟元素
    nextSibling(child) {
        return child.nextSibling
    },
    // 文本节点设置内容
    setText(textNode, text) {
        textNode.nodeValue = text
    },
    // 元素节点设置内容
    setElementText(element, text) {
        element.textContent = text
    },
}

// 创建元素节点 创建文本节点 节点的增删改查 获取父子关系
