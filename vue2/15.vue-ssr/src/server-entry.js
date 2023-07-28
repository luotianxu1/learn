// 服务端入口
import createApp from './app.js'

// 服务端渲染可以返回一个函数

export default (context) => {
    // 此方法是在服务端调用的
    return new Promise((resolve, reject) => {
        let { app, router, store } = createApp()

        router.push(context.url)
        router.onReady(() => {
            const matchComponents = router.getMatchedComponents() // 获取匹配到的组件
            if (matchComponents.length == 0) {
                //没有匹配到前端路由
                return reject({ code: 404 })
            } else {
                // matchComponents 指的是路由匹配到的所有组件 （页面级别的组件）
                Promise.all(
                    matchComponents.map((component) => {
                        if (component.asyncData) {
                            // 服务端在渲染的时候 默认会找到页面级组件中的asyncData，并且在服务端也会创建一个vuex ，传递给asyncData
                            return component.asyncData(store)
                        }
                    })
                ).then(() => {
                    // 会默认在window下生成一个变量 内部默认就这样做的
                    context.state = store.state //  服务器执行完毕后，最新的状态保存在store.state上
                    resolve(app) // app是已经获取到数据的实例
                })
            }
        })
        // return app // 每次都能产生一个新的应用
    })
}
