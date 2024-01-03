import * as TYPES from '../action-type'
import api from '../../api'

const baseAction = {
    // 异步获取登陆信息
    async queryuseInfoAsync() {
        let info = null
        try {
            let { code, data } = await api.userInfo()
            if (code === 0) {
                info = data
                console.log(info)
            }
        } catch (_) {}
        return {
            type: TYPES.BASE_INFO,
            info,
        }
    },
    // 清除存储的登陆信息
    clearUserInfo() {
        return {
            type: TYPES.BASE_INFO,
            info: null,
        }
    },
}

export default baseAction
