import { ShapeFlags } from '@vue/shared'
import { getCurrentInstance } from './component'
import { onMounted, onUpdated } from './apiLifeCycle'

export const KeepAlive = {
    __iskeepAlive: true, // 自定义用来表示keep-alive组件
    props: {
        max: Number,
    },
    setup(props, { slots }) {
        const keys = new Set() // 缓存组件的key
        const cache = new Map() // 映射表来缓存组件间的关系

        // dom操作api都在instance.ctx.renderer上面
        const instance = getCurrentInstance()

        let { move, createElement, unmount } = instance.ctx.renderer
        let storageContainer = createElement('div') // 稍后组件卸载的时候我将真实dom移动到这个容器中

        instance.ctx.active = (vnode, container, anchor) => {
            move(vnode, container, anchor) // 将存储的节点拿回来放入即可
        }

        instance.ctx.deactiveate = (vnode) => {
            move(vnode, storageContainer) // 将存储的节点拿回来放入即可
        }

        let pendingCacheKey = null

        function cacheNode() {
            cache.set(pendingCacheKey, instance.subTree)
        }

        onMounted(cacheNode)
        onUpdated(cacheNode)
        function pruneCache(key) {
            let cacheVnode = cache.get(key)
            keys.delete(key)
            cache.delete(key)

            // 需要根据删除的key 来移除

            if (cacheVnode) {
                let shapeFlag = cacheVnode.shapeFlag
                if (shapeFlag & ShapeFlags.COMPONENT_KEPT_ALIVE) {
                    shapeFlag -= ShapeFlags.COMPONENT_KEPT_ALIVE
                }
                if (shapeFlag & ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE) {
                    shapeFlag -= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE
                }
                cacheVnode.shapeFlag = shapeFlag
                unmount(cacheVnode, storageContainer)
                // 这里还需要将storageContainer中的节点删除
            }
        }

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
                vnode.component = cacheVnode.component // 复用组件
                vnode.shapeFlag |= ShapeFlags.COMPONENT_KEPT_ALIVE // 表示这个组件不应该走初始化了,应该走activated逻辑
            } else {
                keys.add(key)

                let { max } = props
                if (max && keys.size > max) {
                    pruneCache(keys.values().next().value)
                }
            }

            return vnode
        }
    },
}
