import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd'
import * as TYPRS from '../store/action.types'

const VoteFooter = function VoteFooter() {
    const dispath = useDispatch()

    return (
        <div className='footer'>
            <Button
                type='primary'
                onClick={() => {
                    dispath({
                        type: TYPRS.VOTE_SUP,
                    })
                }}
            >
                支持
            </Button>
            <Button
                type='primary'
                onClick={() => {
                    dispath({
                        type: TYPRS.VOTE_SUP + '@SAGA@',
                    })
                }}
            >
                异步支持
            </Button>
            <Button
                type='primary'
                danger
                onClick={() => {
                    dispath({
                        type: TYPRS.VOTE_OPP,
                    })
                }}
            >
                反对
            </Button>
            <Button
                type='primary'
                danger
                onClick={() => {
                    dispath({
                        type: TYPRS.VOTE_OPP + '@SAGA@',
                    })
                }}
            >
                异步反对
            </Button>
        </div>
    )
}

export default VoteFooter
