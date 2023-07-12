export function getData(cb) {
    setTimeout(() => {
        cb({ name: 'jw' })
    }, 2000)
}

export function getDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: 'jw' })
        }, 2000)
    })
}
