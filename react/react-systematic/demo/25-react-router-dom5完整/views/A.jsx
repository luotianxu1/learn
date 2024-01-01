import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import RouterView from '../router'
import routes from '../router/aRouter'

const DemoBox = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 12px;

    .menu {
        color: #000;
        display: block;
    }
`

const A = function A(A) {
    return (
        <DemoBox>
            <div className='menu'>
                <Link to='/a/a1'>A1</Link>
                <Link to='/a/a2'>A2</Link>
                <Link to='/a/a3'>A3</Link>
            </div>
            <div className='view'>
                <RouterView routes={routes}></RouterView>
            </div>
        </DemoBox>
    )
}

export default A
