export function getList() {
    return new Promise((resolve, reject) => {
        resolve([1, 2, 3, 4])
    })
}

export function getData() {
    return new Promise((resolve, reject) => {
        resolve(['香蕉'])
    })
}

export function getUrl() {
    return new Promise((resolve, reject) => {
        resolve(['https://baidu.com'])
    })
}
