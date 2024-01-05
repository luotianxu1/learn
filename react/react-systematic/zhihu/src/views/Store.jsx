import React, { useEffect } from 'react'
import SkeletonAgain from '../components/SkeletonAgain'
import { connect } from 'react-redux'
import action from '../store/action'

const Store = function Store() {
    return <div className='store-box'>收藏</div>
}

export default connect((state) => state.store, action.store)(Store)
