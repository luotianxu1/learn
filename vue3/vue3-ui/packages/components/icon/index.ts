import _Icon from './src/Icon.vue'
import { withInstall } from '@zi-shui/utils/with-install'

const Icon = withInstall(_Icon)

export default Icon
export * from './src/icon'
export type IconInstance = InstanceType<typeof Icon> // 让用户可以通过ref使用组件的类型，还需要增加instance实力类型

// 为了在使用ZIcon的时候  可以有组件提示 （在模板中） 需要配合volar
declare module 'vue' {
  export interface GlobalComponents {
    ZIcon: typeof Icon
  }
}
