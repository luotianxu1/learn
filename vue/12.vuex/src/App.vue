<template>
    <div id="app">
        {{ this.$store.state.age }}<br />
        {{ this.$store.getters.myAge }}<br />

        a{{ this.$store.state.a.age }}<br />
        a{{ this.$store.state.b.age }}<br />
        <button @click="$store.commit('changeAge', 10)">更新age</button>
        <button @click="$store.dispatch('changeAge', 10)">异步更新age</button>
    </div>
</template>
<script>
export default {
    name: 'app',
    data() {
        return {}
    },
    mounted() {},
}
</script>
