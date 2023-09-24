import _Input from './src/input.vue'
import { withInstall } from '@zi-shui/utils/with-install'
const Input = withInstall(_Input)

export default Input
export * from './src/input'
export type InputInstance = InstanceType<typeof Input> // 让用户可以通过ref使用组件的类型，还需要增加instance实力类型
// 为了在使用ZIcon的时候  可以有组件提示 （在模板中） 需要配合volar
declare module 'vue' {
  export interface GlobalComponents {
    ZInput: typeof Input
  }
}

// eslint 规范检测 但是 pretter格式化代码
