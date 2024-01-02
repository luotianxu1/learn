import React from 'react'
import { NavBar } from 'antd-mobile'
import PropTypes from 'prop-types'

const NavBarAgain = function NavBarAgain(props) {
    let { title } = props
    const handleback = () => {}
    return <NavBar onBack={handleback}>{title}</NavBar>
}

NavBarAgain.defaultProps = {
    title: '个人中心',
}
NavBarAgain.propTypes = {
    title: PropTypes.string,
}

export default NavBarAgain
