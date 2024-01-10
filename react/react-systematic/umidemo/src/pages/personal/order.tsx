import { useNavigate, history } from 'umi'

const OrderPage = () => {
    /**
     * navigate('/xxx')
     * navigate(-1)
     * navigate(1)
     * navigate('/xxx',{replace:true,state:{...}})
     * navigate({
     *  pathname: '/xxx',
     *  search:'xxx=xxx&xxx=xxx'
     * })
     */
    const navigate = useNavigate()

    const handle = () => {
        // navigate({
        //     pathname: '/personal/profile',
        //     search: 'lx=0&name=text',
        // })
        // history.push({
        //     pathname: '/personal/profile',
        //     search: 'lx=0&name=text',
        //     // 我们在开启了histiryWithQuery配置项之后，就可以使用query对象进行传递了
        //     // query: {
        //     //     lx: 0,
        //     //     name: 'text',
        //     // },
        // })
        // navigate('/personal/profile', {
        //     state: {
        //         lx: 0,
        //         name: 'text',
        //     },
        // })
        history.push('/personal/profile', {
            lx: 0,
            name: 'text',
        })
    }

    return (
        <div>
            我的订单
            <button onClick={handle}>按钮</button>
        </div>
    )
}

export default OrderPage
