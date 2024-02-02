const Koa = require('koa')
const app = new Koa()

// 中间件1
app.use((ctx, next) => {
    console.log('<<<1')
    next()
    console.log('1>>>')
})

// 中间件 2
app.use((ctx, next) => {
    console.log('<<<2')
    next()
    console.log('2>>>')
})

// 中间件 3
app.use((ctx, next) => {
    console.log('<<<3')
    next()
    console.log('3>>>')
})
app.listen(8000, '0.0.0.0', () => {
    console.log(`Server is starting`)
})
