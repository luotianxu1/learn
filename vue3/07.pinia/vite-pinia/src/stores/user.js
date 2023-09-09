import { defineStore } from 'pinia'
import { computed, reactive, toRefs } from 'vue'

export const useUserStore = defineStore('user', () => {
    const person = reactive({ name: 'luo', age: 12 })

    const doubleAge = computed(() => {
        return person.age * 2
    })

    const changeAge = (paylod) => {
        person.age += paylod
    }

    return {
        ...toRefs(person),
        doubleAge,
        changeAge,
    }
})
