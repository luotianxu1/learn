import createMatcher from './create-matcher'
import install from './install'
import BrowserHistory from './history/history'
import HashHistory from './history/hash'

class VueRouter {
    constructor(options = {}) {
        // 根据用户的配置和当前请求的路径 渲染对应的组件
        // 创建匹配器 可用与后续的匹配操作

        // 用户没有传递配置 就默认传入一个空数组
        // 1、match通过路由来匹配组件
        // 2、addRoutes 动态添加匹配规则
        this.matcher = createMatcher(options.routes || [])

        // 我们需要根据不同的路径进行切换
        options.mode = options.mode || 'hash' // 默认没有传入就是hash模式
        switch (options.mode) {
            case 'hash':
                this.history = new HashHistory(this)
                break
            case 'history':
                this.history = new BrowserHistory(this)
                break
        }
        this.beforeHooks = []
    }

    match(location) {
        return this.matcher.match(location)
    }

    push(to) {
        this.history.push(to)
    }

    // 初始化
    init(app) {
        // 监听hash变化 默认跳转对应的路径中
        const history = this.history

        const setUpHashListener = () => {
            history.setUpListener() // 监听路有变化 hashchange
        }

        /**
         * history.getCurrentLocation() // 获取当前的位置
         */
        history.transitionTo(history.getCurrentLocation(), setUpHashListener)

        history.listen((route) => {
            // 监听 监听如果current变化了 就重新的给 _route赋值
            app._route = route
            console.log(app._route)
        })
    }

    beforeEach(fn) {
        this.beforeHooks.push(fn)
    }
}

VueRouter.install = install

// 默认vue-router插件倒出一个类，用户会new Router({})

export default VueRouter
