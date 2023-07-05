export default {
    namespaced: true,
    state: {
        age: 444,
    },
    getters: {},
    actions: {},
    mutations: {
        changeAge(state, payload) {
            state.age += payload
        },
    },
}
