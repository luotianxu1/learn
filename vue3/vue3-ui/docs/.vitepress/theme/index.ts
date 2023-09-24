import DefaultTheme from 'vitepress/theme'
import '@zi-shui/theme-chalk/src/index.scss'
import ZIcon from '@zi-shui/components/icon'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ZIcon) // 注册组件
    //  其它组件都可以注入
  }
}
