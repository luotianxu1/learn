const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*` // 标签名
const qnameCapture = `((?:${ncname}\\:)?${ncname})` //  用来获取的标签名的 match后的索引为1的
const startTagOpen = new RegExp(`^<${qnameCapture}`) // 匹配开始标签的
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`) // 匹配闭合标签的
//           aa  =   "  xxx "  | '  xxxx '  | xxx
const attribute =
    /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/ // a=b  a="b"  a='b'
const startTagClose = /^\s*(\/?)>/ //     />   <div/>
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // {{aaaaa}}

export function parseHTML(html) {
    function createASTElement(tagName, attrs) {
        return {
            tag: tagName, //标签名
            type: 1, // 元素类型
            children: [], // 孩子列表
            attrs, // 属性集合
            parent: null, // 父元素
        }
    }

    let root
    let currentParent
    let stack = []

    // 开始标签
    function start(tagName, attrs) {
        let element = createASTElement(tagName, attrs)
        if (!root) {
            root = element
        }
        currentParent = element // 当前解析的标签保存起来
        stack.push(element)
    }

    // 在结尾标签处创建父子关系
    function end(tagName) {
        let last = stack.pop()
        if (last.tag !== tagName) {
            throw new Error('标签有误')
        }
        currentParent = stack[stack.length - 1]
        if (currentParent) {
            last.parent = currentParent
            currentParent.children.push(last)
        }
    }

    function charts(text) {
        text = text.replace(/\s/g, '')
        if (text) {
            currentParent.children.push({
                type: 3,
                text,
            })
        }
    }

    // 截取字符串
    function advance(n) {
        html = html.substring(n)
    }
    // 匹配开始
    function parseStartTag() {
        const start = html.match(startTagOpen)
        if (start) {
            const match = {
                tagName: start[1],
                attrs: [],
            }
            // 删除开始标签
            advance(start[0].length)

            // 不是结尾并且有属性
            let end
            let attr
            while (
                !(end = html.match(startTagClose)) &&
                (attr = html.match(attribute))
            ) {
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5],
                })
                advance(attr[0].length)
            }
            if (end) {
                advance(end[0].length)
            }
            return match
        }
        return false // 不是开始标签
    }
    // 只要html不为空就一直解析
    while (html) {
        let textEnd = html.indexOf('<')
        if (textEnd == 0) {
            // 开始标签
            const startTagMatch = parseStartTag()
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue
            }
            // 结束标签
            const endTagMatch = html.match(endTag)
            if (endTagMatch) {
                end(endTagMatch[1])
                advance(endTagMatch[0].length)
                continue
            }
        }
        // 文本
        let text
        if (textEnd > 0) {
            text = html.substring(0, textEnd)
        }
        if (text) {
            charts(text)
            advance(text.length)
        }
    }

    return root
}
