import { Button } from 'antd'
import React, { memo, useContext } from 'react'
import ThemeContext from '../ThemeContext'

const VoteFooter = function VoteFooter(props) {
    console.log('Footer Render')
    let { change } = useContext(ThemeContext)
    return (
        <div className='footer'>
            <Button type='primary' onClick={change.bind(null, 'sup')}>
                支持
            </Button>
            <Button type='primary' danger onClick={change.bind(null, 'opp')}>
                反对
            </Button>
        </div>
    )
}

export default memo(VoteFooter)
