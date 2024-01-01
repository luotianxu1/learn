import React from 'react'
import qs from 'qs'

const B = function B(props) {
    //  {history,location.match}
    console.log(props)
    let { history } = props
    return (
        <div>
            B组件的内容
            <button
                onClick={() => {
                    /**
                     * 传参方案一：问号传参
                     *  + 传递的信息出现在url上，不安全、长度限制
                     *  + 信息是显式的，即使目标路由刷新，传递的信息也在
                     */
                    // history.push('/c?id=100&name=test')
                    // history.push({
                    //     pathname: '/c',
                    //     search: qs.stringify({
                    //         id: 100,
                    //         name: 'test',
                    //     }),
                    // })
                    /**
                     * 传参方式二：路径参数【把需要传递的值，作为路径的一部分】
                     *  + 传递的信息也在url地址中：比问好传参看起来漂亮一些，但是也存在安全和长度限制
                     *  + 因为信息都在地址中，即便在目标组件刷信息，传递信息也在
                     */
                    // history.push('/c/100/test')
                    /**
                     * 传参方案三：隐式传参
                     *  + 传递的信息不会出现在URL地址中
                     *  + 在目标组件内刷新，传递的信息就丢失来
                     */
                    history.push({
                        pathname: '/c',
                        state: {
                            id: 100,
                            name: 'test',
                        },
                    })
                }}
            >
                按钮
            </button>
        </div>
    )
}

export default B
