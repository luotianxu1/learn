// html => render函数
// ast语法树

const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*` // 标签名
const qnameCapture = `((?:${ncname}\\:)?${ncname})` //  用来获取的标签名的 match后的索引为1的
const startTagOpen = new RegExp(`^<${qnameCapture}`) // 匹配开始标签的
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`) // 匹配闭合标签的
//           aa  =   "  xxx "  | '  xxxx '  | xxx
const attribute =
    /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/ // a=b  a="b"  a='b'
const startTagClose = /^\s*(\/?)>/ //     />   <div/>
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // {{aaaaa}}

// 开始标签
function start(tagName, attrs) {}

function end(tagName) {}

function charts(text) {}

function parseHTML(html) {
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
            const startTagMatch = parseStartTag()
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs)
                // continue
            }
            console.log(html)
            break
        }
    }
}

export function compileToFunctions(template) {
    // 1、需要将html代码转化成ast语法树 可以用ast树来描述语言本身
    let ast = parseHTML(template)
    // 2、通过这棵树 重新生成代码
}
