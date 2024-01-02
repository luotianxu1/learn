import React from 'react'
import { useLocation, useSearchParams, useParams } from 'react-router-dom'

const C = function C() {
    // 问号传参
    // const locatin = useLocation()
    // const usp = new URLSearchParams(locatin.search)
    // console.log(usp.get('id'))
    // const [usp] = useSearchParams()
    // console.log(usp.get('id'))
    // 路径参数
    // const params = useParams()
    // console.log(params)
    // 隐式传参
    const location = useLocation()
    console.log(location.state)
    return <div>C组件的内容</div>
}

export default C
