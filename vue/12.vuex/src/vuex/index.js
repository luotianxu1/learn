import { Store, install } from './store'
// 入口文件

export function mapState(stateArr) {
    let obj = {}
    for (let i = 0; i < stateArr.length; i++) {
        let stateName = stateArr[i]
        obj[stateName] = function () {
            return this.$store.state[stateName]
        }
    }
    return obj
}
export function mapGetters(stateArr) {
    let obj = {}
    for (let i = 0; i < stateArr.length; i++) {
        let stateName = stateArr[i]
        obj[stateName] = function () {
            return this.$store.getters[stateName]
        }
    }
    return obj
}

export default {
    Store,
    install,
}
