import React from 'react'
import { NavLink, Outlet } from 'umi'

const PersonalPage = () => {
    return (
        <div>
            <div className='menu'>
                <NavLink to='/personal/order'>订单管理</NavLink>
                <NavLink to='/personal/profile'>个人信息</NavLink>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default PersonalPage
