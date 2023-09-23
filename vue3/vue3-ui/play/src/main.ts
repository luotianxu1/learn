import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ZIcon from '@zi-shui/components/icon'
import '@zi-shui/theme-chalk/src/index.scss'

const plugins = [ZIcon]

const app = createApp(App)
plugins.forEach((comp) => {
    app.use(comp)
})
app.mount('#app')
