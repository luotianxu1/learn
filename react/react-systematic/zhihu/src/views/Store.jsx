import React from 'react'
import { connect } from 'react-redux'
import action from '../store/action'

const Store = function Store() {
    return <div className='store-box'>收藏</div>
}

export default connect((state) => state.store, action.store)(Store)
