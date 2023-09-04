import { ShapeFlags } from '@vue/shared'
import { getCurrentInstance } from './component'
import { onMounted } from './apiLifeCycle'

export const KeepAlive = {
    __iskeepAlive: true, // 自定义用来表示keep-alive组件
    setup(props, { slots }) {
        const keys = new Set() // 缓存组件的key
        const cache = new Map() // 映射表来缓存组件间的关系

        // dom操作api都在instance.ctx.renderer上面
        const instance = getCurrentInstance()

        let pendingCacheKey = null
        onMounted(() => {
            cache.set(pendingCacheKey, instance.subTree)
        })

        return () => {
            let vnode = slots.default()

            if (!(vnode.shapeFlag && ShapeFlags.STATEFUL_COMPONENT)) {
                return vnode
            }
            let comp = vnode.type
            const key = vnode.key == null ? comp : vnode.key
            pendingCacheKey = key

            let cacheVnode = cache.get(key)
            if (cacheVnode) {
            } else {
                keys.add(key)
            }

            return vnode
        }
    },
}
