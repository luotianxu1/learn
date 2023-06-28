export default function createRouteMap(routes, oldPathMap) {
    let pathMap = oldPathMap || {} // 默认没有传递，直接创建映射关系

    // 映射关系
    routes.forEach((route) => {
        addRouteRecord(route, pathMap)
    })

    return {
        pathMap,
    }
}

function addRouteRecord(route, pathMap, parent) {
    let path = parent ? `${parent.path}/${route.path}` : route.path
    let record = {
        path,
        component: route.component, // 组件
        props: route.props || {},
        parent, // 这个属性用来标识当前组件的父亲是谁
    }

    // 不能定义重复的路有 否则只生效第一个
    if (!pathMap[path]) {
        pathMap[path] = record
    }

    if (route.children) {
        route.children.forEach((childRoute) => {
            // 在遍历儿子时 将父亲的记录传入进去
            addRouteRecord(childRoute, pathMap, record) // 在循环儿子的时候将父路径也同时传入，目的是为了在子路由添加的时候可以拿到父路径
        })
    }
}
