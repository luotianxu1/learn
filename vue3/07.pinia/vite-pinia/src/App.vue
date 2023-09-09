<template>
    {{ count }}
    {{ double }}
    <button @click="store.count++">增加</button>
    <button @click="increment(5)">通过action修改</button>
</template>

<script setup>
import { useMainStore } from './stores/main'
import { storeToRefs } from 'pinia'

const store = useMainStore()
const { increment } = store
const { count, double } = storeToRefs(store)

function handleClick() {
    // count.value++
    store.increment(5)
}
</script>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
