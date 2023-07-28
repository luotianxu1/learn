import Vue from 'vue'

// 1、vuex是一个对象 install方法
// 2、Vuex中有一个Store类
// 3、混入到组件中 增添store属性
import Vuex from '@/vuex'
import a from './a'
import b from './b'

Vue.use(Vuex)

function persists() {
    return function (store) {
        console.log(store)
        // vuex-persists
        let localState = JSON.parse(localStorage.getItem('VUEX:STATE'))
        if (localState) {
            store.replaceState(localState)
        }

        // 和 mutation挂钩的
        store.subscribe((mutation, rootState) => {
            // 状态变化了 想做一些其他事
            // 状态发生变化就存localStorage中
            // 防抖
            localStorage.setItem('VUEX:STATE', JSON.stringify(rootState))
        })
    }
}

const store = new Vuex.Store({
    plugins: [
        persists(), // 每次状态变化都可以存入到localStorage中
    ],
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
