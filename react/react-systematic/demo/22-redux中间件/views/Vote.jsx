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

// export default connect((state) => {
//     return {
//         supNum: state.vote.supNum,
//         oppNum: state.vote.oppNum
//     }
// })(Vote)

export default connect((state) => {
    return state.vote
})(Vote)

/**
 * connect(mapStateToProps,mapDispatchToProps) (我们要渲染的组件)
 *  mapStateToProps：可以获取到redux中的公共状态，把需要的信息作为属性，传递组件即可
 *  connect(() => {
 *      // 存储redux容器中，所有模块的公共状态信息
 *      // 返回对象中的信息，就是要作为属性，传递给组件的信息
 *      return {
 *          supNUm:state.vote.supNum
 *      }
 *  })(Vote)
 */
