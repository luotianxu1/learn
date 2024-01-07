import React from 'react'
import VoteMain from './VoteMain'
import VoteFooter from './VoteFooter'
import { connect } from 'react-redux'

const Vote = function Vote(props) {
    let { supNum, oppNum } = props
    return (
        <div className='vote-box'>
            <div className='header'>
                <h2 className='title'>React</h2>
                <span className='num'>{supNum + oppNum}</span>
            </div>
            <VoteMain></VoteMain>
            <VoteFooter></VoteFooter>
        </div>
    )
}

export default connect((state) => {
    return state.vote
})(Vote)
