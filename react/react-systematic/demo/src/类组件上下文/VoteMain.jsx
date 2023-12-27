import React from 'react'
import ThemeContext from '../ThemeContext'

class VoteMain extends React.Component {
    static contextType = ThemeContext

    render() {
        let { supNum, oppNum } = this.context
        let ratio = '--'
        let total = supNum + oppNum
        if (total > 0) ratio = ((supNum / total) * 100).toFixed(2) + '%'
        return (
            <div className='main'>
                <p>支持人数:{supNum}人</p>
                <p>反对人数:{oppNum}人</p>
                <p>支持比率:{ratio}</p>
            </div>
        )
    }
}

export default VoteMain
