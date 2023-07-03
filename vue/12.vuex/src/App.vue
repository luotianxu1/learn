<template>
    <div id="app">
        {{ this.$store.state.age }}
        <!-- <br />{{ this.$store.getters.myAge }}
        <button @click="$store.commit('changeAge', 10)">更新age</button>
        <button @click="$store.dispatch('changeAge', 10)">异步更新age</button> -->
    </div>
</template>
<script>
export default {
    name: 'app',
    data() {
        return {}
    },
    mounted() {
        // console.log(this._routerRoot._router)
    },
}
</script>
