export function parser(str) {
    const obj = {}
    str.replace(/([^&=?]+)=([^&=?]+)/g, function () {
        let value = Number(arguments[2])
        if (isNaN(value)) {
            obj[arguments[1]] = arguments[2]
        } else {
            obj[arguments[1]] = value
        }
    })
    return obj
}

export function stringify(obj) {
    const arr = []
    for (let key in obj) {
        arr.push(`${key}=${obj[key]}`)
    }
    return arr.join('&')
}

// console.log(parser('a=1&b=2'))
// console.log(stringify({ a: 1, b: 2 }))
