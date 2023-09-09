import { defineStore } from '../pinia'

export const useMainStore = defineStore('main', {
    state: () => ({
        count: 0,
    }),
    getters: {
        double() {
            return this.count * 2
        },
    },
    actions: {
        increment(paylod) {
            this.count += paylod
        },
        decrement() {
            this.count--
        },
    },
})
