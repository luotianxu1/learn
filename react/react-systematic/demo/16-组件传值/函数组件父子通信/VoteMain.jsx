import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

const VoteMain = function VoteMain(props) {
    let { supNum, oppNum } = props

    let ratio = useMemo(() => {
        let ratio = '--'
        let total = supNum + oppNum
        if (total > 0) ratio = ((supNum / total) * 100).toFixed(2) + '%'
        return ratio
    }, [supNum, oppNum])

    return (
        <div className='main'>
            <p>支持人数:{supNum}人</p>
            <p>反对人数:{oppNum}人</p>
            <p>支持比率:{ratio}</p>
        </div>
    )
}

VoteMain.defaultProps = {
    supNum: 0,
    oppNum: 0,
}

VoteMain.propTypes = {
    supNum: PropTypes.number,
    oppNum: PropTypes.number,
}

export default VoteMain
