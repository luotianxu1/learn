import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@zi-shui/theme-chalk/src/index.scss'
import ZButton from '@zi-shui/components/button'
import ZIcon from '@zi-shui/components/icon'

const plugins = [ZIcon, ZButton]

const app = createApp(App)
plugins.forEach(comp => {
  app.use(comp)
})
app.mount('#app')
