import React from 'react'
import { connect } from 'react-redux'
import action from '../store/action'
import { Toast } from 'antd-mobile'

const Personal = function Personal(props) {
    let { info, clearUserInfo, removeStoreList, navigate } = props

    const signout = () => {
        clearUserInfo()
        removeStoreList()
        localStorage.removeItem('token')
        Toast.show({
            icon: 'success',
            content: '退出成功',
        })
        navigate('/login')
    }
    return (
        <div className='personal-box'>
            <div onClick={signout}>退出登录</div>
        </div>
    )
}

export default connect((state) => state.base, {
    clearUserInfo: action.base.clearUserInfo,
    removeStoreList: action.store.removeStoreList,
})(Personal)
