import _Button from './src/button.vue'
import { withInstall } from '@zi-shui/utils/with-install'
const Button = withInstall(_Button)

export default Button
export * from './src/button'
export type ButtonInstance = InstanceType<typeof Button> // 让用户可以通过ref使用组件的类型，还需要增加instance实力类型
// 为了在使用ZIcon的时候  可以有组件提示 （在模板中） 需要配合volar
declare module 'vue' {
  export interface GlobalComponents {
    ZButton: typeof Button
  }
}

// eslint 规范检测 但是 pretter格式化代码
