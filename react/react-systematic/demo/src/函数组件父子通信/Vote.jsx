import React, { useState, useCallback } from 'react'
import VoteMain from './VoteMain'
import VoteFooter from './VoteFooter'

const Vote = function Vote() {
    let [supNum, setSupNum] = useState(10)
    let [oppNum, setOppNum] = useState(0)

    const change = useCallback(
        (type) => {
            if (type === 'sup') {
                setSupNum(supNum + 1)
                return
            }
            setOppNum(oppNum + 1)
        },
        [supNum, oppNum]
    )

    return (
        <div className='vote-box'>
            <div className='header'>
                <h2 className='title'>React</h2>
                <span className='num'>{supNum + oppNum}</span>
            </div>
            <VoteMain supNum={supNum} oppNum={oppNum}></VoteMain>
            <VoteFooter change={change}></VoteFooter>
        </div>
    )
}

export default Vote
