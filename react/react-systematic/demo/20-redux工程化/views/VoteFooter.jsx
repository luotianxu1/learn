import { Button } from 'antd'
import React, { useContext } from 'react'
import ThemeContext from '../ThemeContext'
import action from '../store/actions'

const VoteFooter = function VoteFooter() {
    const { store } = useContext(ThemeContext)

    return (
        <div className='footer'>
            <Button
                type='primary'
                onClick={() => {
                    store.dispatch(action.vote.support())
                }}
            >
                支持
            </Button>
            <Button
                type='primary'
                danger
                onClick={() => {
                    store.dispatch(action.vote.oppose())
                }}
            >
                反对
            </Button>
        </div>
    )
}

export default VoteFooter
