// 拿到数组原型上的方法
let oldArrayPrototype = Array.prototype
export let arrayMethods = Object.create(oldArrayPrototype)

let methods = ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice']

methods.forEach((method) => {
    // 用户调用的如果是以上七个方法 会用我自己重写的，否则用原来的数组方法
    arrayMethods[method] = function (...args) {
        // 我们要知道数组对应哪个dep
        //  args 是参数列表 arr.push(1,2,3)
        oldArrayPrototype[method].call(this, ...args)
        let inserted
        let ob = this.__ob__ // 根据当前数组获取到observer实例
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args // 就是新增的内容
                break
            case 'splice':
                inserted = args.slice(2)
            default:
                break
        }
        // 如果有新增的内容要进行继续劫持, 我需要观测的数组里的每一项，而不是数组
        if (inserted) ob.observeArray(inserted)
        ob.dep.notify()
    }
})
