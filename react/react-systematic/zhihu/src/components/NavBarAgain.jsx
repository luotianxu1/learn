import React from 'react'
import { NavBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import './NavBarAgain.less'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

const NavBarAgain = function NavBarAgain(props) {
    let { title } = props
    const navigate = useNavigate()
    const location = useLocation()
    const [usp] = useSearchParams()

    const handleback = () => {
        let to = usp.get('to')
        if (location.pathname === '/login' && /^\/detail\/\d+$/.test(to)) {
            navigate(to, { replace: true })
            return
        }
        navigate(-1)
    }

    return (
        <NavBar className='navbar-again-box' onBack={handleback}>
            {title}
        </NavBar>
    )
}

NavBarAgain.defaultProps = {
    title: '个人中心',
}
NavBarAgain.propTypes = {
    title: PropTypes.string,
}

export default NavBarAgain
