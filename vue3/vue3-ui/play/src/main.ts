import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@zi-shui/theme-chalk/src/index.scss'
import ZButton from '@zi-shui/components/button'
import ZIcon from '@zi-shui/components/icon'
import ZInput from '@zi-shui/components/input'
import { FormItem as ZFormItem, Form as ZForm } from '@zi-shui/components/form'

const plugins = [ZIcon, ZButton, ZInput, ZFormItem, ZForm]

const app = createApp(App)
plugins.forEach(comp => {
  app.use(comp)
})
app.mount('#app')
