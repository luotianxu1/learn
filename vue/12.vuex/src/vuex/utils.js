// 遍历对象
export const forEachVal = (obj, callback) => {
    Object.keys(obj).forEach((key) => callback(obj[key], key))
}
