import createRouteMap from './create-route-map'
import { createRoute } from './history/base'

export default function createMatcher(routes) {
    let { pathMap } = createRouteMap(routes) //扁平化配置

    function addRoutes(routes) {
        createRouteMap(routes, pathMap)
    }

    function match(location) {
        let record = pathMap[location] // 可能一个路径有多个记录
        if (record) {
            return createRoute(record, {
                path: location,
            })
        }
        return createRoute(null, {
            path: location,
        })
    }

    return {
        addRoutes, // 添加路由
        match, // 匹配路径
    }
}
