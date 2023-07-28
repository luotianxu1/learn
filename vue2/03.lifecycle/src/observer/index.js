import { defineProperty, isObject } from '../utils'
import { arrayMethods } from './array'

class Observer {
    constructor(data) {
        // 判断一个对象是否被观测过，看他有没有__ob__这个属性
        defineProperty(data, '__ob__', this)

        // 使用defineProperty重新定义属性
        if (Array.isArray(data)) {
            // 函数劫持
            data.__proto__ = arrayMethods
            this.observeArray(data)
        } else {
            this.walk(data)
        }
    }
    observeArray(data) {
        // 对我们数组的数组 和 数组中的对象再次劫持 递归了 [{a:1},{b:2}]
        data.forEach((item) => observe(item))
    }
    walk(data) {
        Object.keys(data).forEach((key) => {
            defineReactive(data, key, data[key])
        })
    }
}

function defineReactive(data, key, value) {
    observe(value) // 本身用户默认值是对象套对象 需要递归处理
    Object.defineProperty(data, key, {
        get() {
            console.log('用户获取值了')
            return value
        },
        set(newValue) {
            console.log('用户设置值了')
            if (newValue == value) return
            observe(newValue) // 如果用户赋值一个新对象 ，需要将这个对象进行劫持
            value = newValue
        },
    })
}

export function observe(data) {
    // 如果是对象才观测
    if (!isObject(data)) {
        return
    }
    // 如果对象被观测过
    if (data.__ob__) {
        return
    }
    return new Observer(data)
}
