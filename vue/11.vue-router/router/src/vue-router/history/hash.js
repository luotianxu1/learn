import { History } from './base'

function ensureHash() {
    if (!window.location.hash) {
        window.location.hash = '/'
    }
}

function getHash() {
    return window.location.hash.slice(1)
}

class HashHistory extends History {
    constructor(router) {
        super(router)
        // hash路由初始化的时候 需要增加一个默认hash值 /#/
        ensureHash()
    }

    getCurrentLocation() {
        // 也是要拿到hash值
        return getHash()
    }

    setUpListener() {
        window.addEventListener('hashchange', () => {
            // 当hash值变化了 再次拿到hash值进行跳转
            this.transitionTo(getHash()) // hash变化再次进行跳转
        })
    }
}

export default HashHistory
