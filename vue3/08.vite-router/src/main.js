import { createApp } from 'vue'
import App from './App.vue'
import router from './/router'
const app = createApp(App);
app.use(router); // install 方法, 会给你两个组件，全局组件
app.mount('#app')
