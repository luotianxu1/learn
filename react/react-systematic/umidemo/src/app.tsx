// 运行时的配置
import { matchRoutes } from 'umi'

export function onRouteChange({ clientRoutes, location, routes, action }) {
    console.log(routes) // 扁平化后的所有配置项

    const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route
    let title = route ? route.title : 'My App'
    document.title = title
}
