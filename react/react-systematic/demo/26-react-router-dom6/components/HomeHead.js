import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { withRouter } from '../router'

const NavBox = styled.nav`
    a {
        margin-right: 20px;
        color: #000;
        &.active {
            color: red;
        }
    }
`

class HomeHead extends React.Component {
    render() {
        return (
            <NavBox>
                <NavLink to='/a'>A</NavLink>
                <NavLink to='/b'>B</NavLink>
                <NavLink to='/c'>C</NavLink>
            </NavBox>
        )
    }
}

export default withRouter(HomeHead)
