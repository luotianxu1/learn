import { Button } from 'antd'
import React from 'react'
import action from '../store/actions'
import { connect } from 'react-redux'

const VoteFooter = function VoteFooter(props) {
    let { supportAction, supportActionAsync, opposeAction, opposeActionAsync } =
        props
    return (
        <div className='footer'>
            <Button type='primary' onClick={supportAction}>
                支持
            </Button>
            <Button type='primary' onClick={supportActionAsync}>
                异步支持
            </Button>
            <Button type='primary' danger onClick={opposeAction}>
                反对
            </Button>
            <Button type='primary' danger onClick={opposeActionAsync}>
                异步反对
            </Button>
        </div>
    )
}

export default connect(null, action.vote)(VoteFooter)
