<template>
    <div id="app">
        {{ age }}<br />
        {{ this.$store.getters.myAge }}<br />

        a{{ this.$store.state.a.age }}<br />
        b{{ this.$store.state.b.age }}<br />
        <button @click="$store.commit('changeAge', 10)">更新age</button>
        <button @click="$store.dispatch('changeAge', 10)">异步更新age</button>
        <button @click="$store.commit('a/changeAge', 10)">A更新age</button>
        <button @click="$store.dispatch('b/changeAge', 10)">
            B异步更新age
        </button>
    </div>
</template>
<script>
function mapState(stateArr) {
    let obj = {}
    for (let i = 0; i < stateArr.length; i++) {
        let stateName = stateArr[i]
        obj[stateName] = function () {
            return this.$store.state[stateName]
        }
    }
    return obj
}
function mapGetters(stateArr) {
    let obj = {}
    for (let i = 0; i < stateArr.length; i++) {
        let stateName = stateArr[i]
        obj[stateName] = function () {
            return this.$store.getters[stateName]
        }
    }
    return obj
}

export default {
    name: 'app',
    data() {
        return {}
    },
    computed: {
        ...mapState(['age']),
        ...mapGetters(['myAge']),
    },
    mounted() {},
}
</script>
