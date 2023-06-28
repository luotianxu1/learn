import createRouteMap from './create-route-map'

export default function createMatcher(routes) {
    let { pathMap } = createRouteMap(routes) //扁平化配置
    console.log(pathMap)

    function addRoutes(routes) {
        createRouteMap(routes, pathMap)
    }
    function match() {}

    return {
        addRoutes, // 添加路由
        match, // 匹配路径
    }
}
