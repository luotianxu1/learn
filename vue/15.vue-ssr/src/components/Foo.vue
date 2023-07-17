<template>
    <div @click="show">foo{{ $store.state.name }}</div>
</template>
<script>
export default {
    // mounted() {
    //     this.$store.dispatch('changeName', '123')
    // },
    // 希望有些数据更新操作是在后端执行
    asyncData(store) {
        return store.dispatch('changeName', '123')
    },
    methods: {
        show() {
            alert(1)
        },
    },
}
</script>
