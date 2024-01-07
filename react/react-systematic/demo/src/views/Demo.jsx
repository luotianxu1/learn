import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import * as TYPES from '../store/action.types'

const DemoBox = styled.div`
    border: 1px solid #ddd;
    padding: 20px;
    margin: 40px 0;
    width: 200px;
    .num {
        display: block;
        font-size: 20px;
        line-height: 40px;
    }
`

const Demo = function Demo() {
    const dispatch = useDispatch() // 获取dispatch
    const { num } = useSelector((state) => state.demo)
    return (
        <DemoBox>
            <span className='num'>{num}</span>
            <Button
                type='primary'
                onClick={() => {
                    dispatch({
                        type: TYPES.DEMO_COUNT,
                        payload: 5,
                    })
                }}
            >
                按钮
            </Button>
            <Button
                type='primary'
                danger
                onClick={() => {
                    dispatch({
                        type: TYPES.DEMO_COUNT + '@SAGA@',
                        payload: 10,
                    })
                }}
            >
                异步按钮
            </Button>
        </DemoBox>
    )
}

export default Demo
