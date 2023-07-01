export function createRoute(record, location) {
    let res = []

    if (record) {
        while (record) {
            res.unshift(record)
            record = record.parent
        }
    }

    return {
        ...location,
        matched: res,
    }
}

class History {
    constructor(router) {
        this.router = router

        // 当我们创建完路有后 先有一个默认值路径和匹配到的记录做成一个映射表

        // 默认当创建history时 路径应该是/ 并且匹配到的记录是[]
        this.current = createRoute(null, {
            path: '/',
        })
    }

    transitionTo(location, onComplete) {
        // 跳转时都会调用此方法 from to
        // 路径变化了 试图还要刷新 响应式的数据
        let route = this.router.match(location)

        // 这个route就是当前最新的匹配到的结果
        if (
            location == this.current.path &&
            route.matched.length == this.current.matched.length
        ) {
            return
        }

        this.updateRoute(route)

        // 根据路径加载不同的组件
        onComplete && onComplete()
    }

    updateRoute(route) {
        this.current = route // 每次路由切换都会更改current
        this.cb && this.cb(route)
    }

    listen(cb) {
        this.cb = cb // 保存当前的cb函数
    }
}

export { History }
