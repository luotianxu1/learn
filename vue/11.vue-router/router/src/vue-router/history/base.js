class History {
    constructor(router) {
        this.router = router
    }

    transitionTo(location, onComplete) {
        console.log(location)

        // 根据路径加载不同的组件
        onComplete && onComplete()
    }
}

export { History }
