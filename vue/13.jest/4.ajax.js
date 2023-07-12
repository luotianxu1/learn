import axios from 'axios'

export function getList() {
    return axios.get('/list')
}

export function getData() {
    return axios.post('/data')
}

export function getUrl() {
    return axios({ url: '/data' })
}
