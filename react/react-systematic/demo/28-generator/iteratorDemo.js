// 创建一个Iterator类，实现ES6中的迭代器规范
class Iterator {
    constructor(assemble) {
        // assemble:需要迭代的数据结构
        this.assemble = assemble
        // index: 记录迭代次数
        this.index = -1
    }
    next() {
        this.index++
        let { assemble, index } = this
        if (index >= assemble.length) {
            // 迭代完毕
            return {
                done: true,
                value: undefined,
            }
        }
        return {
            done: false,
            value: assemble[index],
        }
    }
}

/**
 * 创建一个实例对象，其应该具备迭代器规范的要求
 * iotor.next()具备next()方法，执行这个方法可以一次获取到数据结构中的每一个成员值，每一次获取的成员值是一个对象
 *   + done：是否迭代完毕
 *   + value: 当前获取的那个值
 * 符合以上两个特点的对象，我们称之为符合迭代器规范的对象
 */
let arr = [10, 20, 30, 40]
// let itor = new Iterator(arr)
// console.log(itor.next())
// console.log(itor.next())
// console.log(itor.next())
// console.log(itor.next())
// console.log(itor.next())

/**
 * 在js中有很多数据结构，天生具备迭代器规范
 *  主要看数据结构（对象）是具备Symbol.iterator这个属性,有这个属性就具备迭代器规范，没有就不具备，具备这个规范，就可以使用for/of循环来迭代数据中的每一项值
 *  + 数组
 *  + 部分类数组
 *   + arguments
 *   + NodeList
 *   + HTMLCollection、
 *  + 字符串
 *
 * 但是对于纯粹对象[或者自己构建的类数组对象]等来讲，默认是不具备Symbol.iterator这个属性的，所以他们不具备迭代器规范【不能使用for/of循环】
 */

// 数组迭代的方式：for、while、forEach/map、for/in、for/of...

// for/of循环主要用于获取数据结构中每一项的值
// for (let value of arr) {
//     console.log(value)
// }
/**
 * 原理
 *  1、迭代之前，先执行数组的Symbol.iterator这个方法，获取一个具备迭代器规范的对象 -》itor
 *  2、开始迭代：每一次迭代都是把itor.next方法执行
 *      + 把获取对象中的value属性值，赋值给val这个变量
 *      + 再看对象中done这个属性的值，如果是false，则继续迭代；如果是true，则结束迭代
 */
// arr[Symbol.iterator] = function () {
//     //返回具备迭代器规范的对象
//     console.log('for/of start')
//     let self = this
//     let index = -1
//     return {
//         next() {
//             index++
//             if (index >= self.length) {
//                 return {
//                     done: true,
//                     value: undefined,
//                 }
//             }
//             return {
//                 done: false,
//                 value: self[index],
//             }
//         },
//     }
// }

// for (let value of arr) {
//     console.log(value)
// }

// ======================================================================
// 迭代对象的方式:for/in;获取所有keys，然后迭代keys;也可以使用for/of（但是需要自己为其设置Symbol.intreator）
// let obj = {
//     name: 'test',
//     age: 13,
//     0: 100,
//     [Symbol('AA')]: 200,
// }

// Object.prototype[Symbol.iterator] = function iterator() {
//     let self = this
//     let index = -1
//     let keys = Reflect.ownKeys(self)
//     return {
//         next() {
//             index++
//             if (index >= keys.length) {
//                 return {
//                     done: true,
//                     value: undefined,
//                 }
//             }
//             let key = keys[index]
//             return {
//                 done: false,
//                 value: self[key],
//             }
//         },
//     }
// }

// for (let val of obj) {
//     console.log(val)
// }
