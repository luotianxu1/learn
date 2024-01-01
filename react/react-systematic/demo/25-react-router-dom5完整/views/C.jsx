import React from 'react'
import {
    useHistory,
    useLocation,
    useRouteMatch,
    useParams,
} from 'react-router-dom'
import qs from 'qs'

const C = function C(C) {
    // 方案一
    // let history = useHistory()
    // let location = useLocation()
    // let match = useRouteMatch()
    // console.log(history, location, match)
    // let search = qs.parse(location.search.substring(1))
    // console.log(search)

    // let usp = new URLSearchParams(location.search)
    // console.log(usp.get('id'))

    // 方案二
    // const match = useRouteMatch()
    // console.log(match)
    // let param = useParams()
    // console.log(param)

    // 方案三
    const location = useLocation()
    console.log(location)
    return <div>C组件的内容</div>
}

export default C
