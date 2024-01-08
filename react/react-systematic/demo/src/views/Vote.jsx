import React from 'react'
import VoteMain from './VoteMain'
import VoteFooter from './VoteFooter'
import { useSelector } from 'react-redux'

const Vote = function Vote() {
    let { supNum, oppNum } = useSelector((state) => state.vote)
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

export default Vote
