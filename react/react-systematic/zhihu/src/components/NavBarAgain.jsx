import React from 'react'
import { NavBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import './NavBarAgain.less'

const NavBarAgain = function NavBarAgain(props) {
    let { title } = props
    const handleback = () => {}
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
