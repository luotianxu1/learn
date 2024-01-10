import { NavLink, Outlet } from 'umi'
import styles from './index.less'

export default function Layout() {
    return (
        <div>
            <nav className='nav-box'>
                <NavLink to='/'>首页</NavLink>
                <NavLink to='/demo/100'>测试页</NavLink>
                <NavLink to='/personal'>个人中心</NavLink>
            </nav>
            <Outlet />
        </div>
    )
}
