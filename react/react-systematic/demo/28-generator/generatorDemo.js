/**
 * 如何创建一个Generator生成器函数
 *  + 把创建函数的function后面加一个*即可
 *  + 箭头函数无法变成生成器函数
 *
 * 当生成器函数执行
 *  + 首先并不会立即把函数体中的代码执行
 *  + 而是返回一个具备迭代器规范的对象
 */
// const fn = function* fn() {
//     console.log(10)
//     return 100
// }
// let itor = fn()

// console.log(itor.next())

// ====================================================================

/**
 * Generator胜澈更年期函数的作用：
 *  可以基于返回的iotr返回的itor(迭代器对象)，基于其next方法，控制函数体中的代码，一步步的去执行
 *  + 每一次执行next，控制函数体中的代码开始执行，直到遇到yield结束
 *    done:false
 *    value:yield后面的值
 *  + 当遇到函数体中的return，或者已经执行到函数最末尾的位置
 *    done:true
 *    value:函数的返回值或者undefined
 */
// const fn = function* fn() {
//     console.log('A')
//     yield 100
//     console.log('B')
//     yield 200
//     console.log('C')
//     yield 300
// }
// let itor = fn()
// console.log(itor.next())
// console.log(itor.next())
// console.log(itor.next())

/**
 * params：生成器函数接收的实参值，他是生成器函数执行时传递的值
 * itor:next(N) 每一次执行next方法，传递的值会作为上一个yield处理的返回值【所以第一次执行next方法，传递的值是没有用的，因为在它之前没有yield】
 */
// const fn = function* fn(...params) {
//     let x = yield 100
//     console.log(x)
//     yield 200
// }
// let itor = fn(10, 20, 30)
// console.log(itor.next('first:1111')) //{ value: 100, done: false }
// console.log(itor.next('first:2222')) //{ value: 200, done: false }

// ====================================================================
// const sum = function* sum() {
//     yield 300
//     yield 400
// }

// const fn = function* fn() {
//     yield 100
//     yield* sum()
//     yield 200
// }

// let itor = fn()
// console.log(itor.next())
// console.log(itor.next())
// console.log(itor.next())
// console.log(itor.next())
// console.log(itor.next())

// ====================================================================
// 需求：串行请求，有三个请求【请求需要的时间分别是1000/2000/3000】
const handle = function* handle() {
    let value = yield delay(1000)
    value = yield delay(2000)
    value = yield delay(3000)
}
let itor = handle()
let { done, value } = itor.next()
value.then((x) => {
    itor.next(x)
})
