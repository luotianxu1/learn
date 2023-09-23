<template>
    首页
    <hr>
    <router-link to="/a">a页面</router-link>
    <router-link to="/b">b页面</router-link>
    <router-view></router-view>
</template>

<script>

export default {
    beforeRouteEnter(to, from, next) {
        console.log('进入前')
    },
    beforeRouteUpdate(to, from, next) {
        console.log('更新前')
    },
    beforeRouteLeave(to, from, next) {
        console.log('离开前')
    }
}
</script>