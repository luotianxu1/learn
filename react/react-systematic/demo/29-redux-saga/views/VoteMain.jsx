import React from 'react'
import { useSelector } from 'react-redux'

const VoteMain = function VoteMain() {
    let { supNum, oppNum } = useSelector((state) => state.vote)

    return (
        <div className='main'>
            <p>支持人数:{supNum}人</p>
            <p>反对人数:{oppNum}人</p>
        </div>
    )
}

export default VoteMain
