const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // {{aaaaa}}

function genProps(attrs) {
    let str = ''
    for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i]
        if (attr.name === 'style') {
            let obj = {}
            attr.value.split(';').forEach((item) => {
                let [key, value] = item.split(':')
                obj[key] = value
            })
            attr.value = obj
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`
    }
    return `{${str.slice(0, -1)}}`
}

function gen(el) {
    if (el.type == 1) {
        // element = 1 text = 3
        return generate(el) // 生成元素节点
    } else {
        let text = el.text
        // 如果是普通文本 不带{{}}
        if (!defaultTagRE.test(text)) {
            return `_v('${text}')`
        } else {
            let tokens = [] // 存放每一段的代码
            let lastIndex = (defaultTagRE.lastIndex = 0) // 如果正则是全局模式，则每次使用前置为0
            let match // 每次匹配到的结果
            while ((match = defaultTagRE.exec(text))) {
                let index = match.index // 保存匹配到的索引
                if (index > lastIndex) {
                    tokens.push(JSON.stringify(text.slice(lastIndex, index)))
                }
                tokens.push(`_s(${match[1].trim()})`)
                lastIndex = index + match[0].length
            }
            if (lastIndex < text.length) {
                tokens.push(JSON.stringify(text.slice(lastIndex)))
            }
            return `_v(${tokens.join('+')})`
        }
    }
}

function genChildren(el) {
    let children = el.children // 获取儿子
    if (children) {
        return children.map((c) => gen(c)).join(',')
    }
    return false
}

export function generate(el) {
    let children = genChildren(el)
    let code = `_c('${el.tag}',${
        el.attrs.length ? genProps(el.attrs) : 'undefined'
    }${children ? `,${children}` : ''})`
    return code
}
