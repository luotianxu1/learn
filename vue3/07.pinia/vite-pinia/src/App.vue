<script setup>
import { useMainStore } from './stores/main.js'
import { useUserStore } from './stores/user.js'
const mainStore = useMainStore()
const { increment } = mainStore

const userStore = useUserStore()
userStore.$subscribe((state) => {
    // watch
})

mainStore.$onAction(({ after, onError }) => {
    after((resolvedValue) => {
        console.log(resolvedValue)
    })
    after((resolvedValue) => {
        console.log(resolvedValue)
    })
    onError((error) => {})
})
// mainStore.$dispose()
</script>

<template>
    {{ mainStore.count }}
    {{ mainStore.double }}
    <button @click="mainStore.count++">增加</button>
    <button
        @click="
            mainStore.$patch((state) => {
                mainStore.count = state.count + 1
                mainStore.count = state.count + 1
                mainStore.count = state.count + 1
                mainStore.count = state.count + 1
            })
        "
    >
        函数patch
    </button>

    <button
        @click="
            mainStore.$patch({
                count: mainStore.count + 1,
            })
        "
    >
        对象patch
    </button>

    <button @click="increment(5)">通过action修改</button>
    <button @click="mainStore.$reset()">重置store</button>
    <button @click="mainStore.$state = { count: 0 }">$state修改</button>
    <hr />

    {{ userStore.age }} {{ userStore.doubleAge }}

    <button @click="userStore.changeAge(5)">修改年龄</button>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
