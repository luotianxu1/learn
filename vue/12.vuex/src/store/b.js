export default {
    namespaced: true,
    state: {
        age: 333,
    },
    getters: {},
    mutations: {
        changeAge(state, payload) {
            state.age += payload
        },
    },
    actions: {
        changeAge({ commit, dispatch }, payload) {
            setTimeout(() => {
                commit('b/changeAge', payload)
            }, 1000)
        },
    },
}
