<script setup>
import {inject} from 'vue'
  function useRoute(){
      return inject('route',{}).value;
  }


  function  useRouter() {
    return inject('router');
  }
  let {push} = useRouter()

  let {matched}= useRoute();
  console.log(matched)
</script>

<template>
<router-link to="/">首页</router-link>
<router-link to="/about">关于页面</router-link>
<button @click="push('/about')">跳转</button>
<hr>
<router-view></router-view>
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
