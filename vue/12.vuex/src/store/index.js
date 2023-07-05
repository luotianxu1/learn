import Vue from 'vue'

// 1、vuex是一个对象 install方法
// 2、Vuex中有一个Store类
// 3、混入到组件中 增添store属性
import Vuex from '@/vuex'
import a from './a'
import b from './b'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        age: 10,
    },
    getters: {
        myAge(state) {
            return state.age + 20
        },
    },
    mutations: {
        changeAge(state, payload) {
            state.age += payload
        },
    },
    actions: {
        changeAge({ commit, dispatch }, payload) {
            setTimeout(() => {
                commit('changeAge', payload)
            }, 1000)
        },
    },
    modules: {
        a,
        b,
    },
})

export default store
