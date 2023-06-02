import { defineProperty, isObject } from '../utils'
import { arrayMethods } from './array'
import Dep from './dep'

class Observer {
    constructor(data) {
        this.dep = new Dep() // 数据可能是数组或者对象
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
    let childDep = observe(value) // 获取到数组对应的dep

    let dep = new Dep() // 每个属性都有一个dep

    // 当页面取值时，说明这个值渲染了，将这个watcher和这个属性对应起来
    Object.defineProperty(data, key, {
        // 依赖收集
        get() {
            if (Dep.target) {
                // 让属性记住这个watcher
                dep.depend()
                if (childDep) {
                    // 默认给数组增加了一个dep属性，当对数组这个对象取值的时候
                    childDep.dep.depend() // 数组存起来了这个渲染watcher
                }
            }
            console.log('用户获取值了')
            return value
        },
        // 依赖更新
        set(newValue) {
            console.log('用户设置值了')
            if (newValue == value) return
            observe(newValue) // 如果用户赋值一个新对象 ，需要将这个对象进行劫持
            value = newValue
            dep.notify() // 告诉当前的属性存放的watcher执行
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
