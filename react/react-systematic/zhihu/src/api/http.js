import axios from 'axios'
import qs from 'qs'
import { isPlainObject } from '@/assets/utils'
import md5 from 'blueimp-md5'
axios.defaults.baseURL = ''
axios.defaults.timeout = 60000
axios.defaults.transformRequest = (data) => {
    if (isPlainObject(data)) return qs.stringify(data)
    return data
}
axios.interceptors.request.use((config) => {
    // 针对于部分接口，我们携带令牌和签名信息
    // let apiList = [
    //         '/check_login',
    //         '/user_info',
    //         '/user_update',
    //         '/store',
    //         '/store_remove',
    //         '/store_list',
    //     ],
    //     token = localStorage.getItem('token')
    // if (apiList.includes(config.url.replace('/api', '')) && token) {
    //     let time = +new Date(),
    //         sign = md5(`${token}@${time}@zhufeng`)
    //     config.headers['authorzation'] = token
    //     config.headers['time'] = time
    //     config.headers['sign'] = sign
    // }
    return config
})
axios.interceptors.response.use(
    (response) => {
        return response.data
    },
    (reason) => {
        return Promise.reject(reason)
    }
)
export default axios
