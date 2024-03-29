import { Button } from 'antd'
import React from 'react'
import action from '../store/actions'
import { connect } from 'react-redux'

const VoteFooter = function VoteFooter(props) {
    let { support, oppose } = props
    return (
        <div className='footer'>
            <Button type='primary' onClick={support}>
                支持
            </Button>
            <Button type='primary' danger onClick={oppose}>
                反对
            </Button>
        </div>
    )
}

// export default connect(null, (dispatch) => {
//     return {
//         support: () => dispatch(action.vote.support()),
//         oppose: () => dispatch(action.vote.oppose()),
//     }
// })(VoteFooter)

export default connect(null, action.vote)(VoteFooter)

/**
 * connect(mapStateToProps,mapDispatchToProps) (我们要渲染的组件)
 *  mapStateToProps：把需要派发的任务，当作属性传递给组件
 *  connect(null,dispatch=>{
 *      // dispatch:store.dispatch
 *      //返回对象中的信息，会作为属性传递给组件
 *      return {
 *          ...
 *      }
 *  })(Vote)
 */
