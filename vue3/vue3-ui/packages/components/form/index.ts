import _FormItem from './src/form-item.vue'
import _Form from './src/form.vue'
import { withInstall } from '@zi-shui/utils/with-install'
export const FormItem = withInstall(_FormItem)
export const Form = withInstall(_Form)
export * from './src/form-item'
export type formItemInstance = InstanceType<typeof FormItem> // 让用户可以通过ref使用组件的类型，还需要增加instance实力类型
export type formInstance = InstanceType<typeof Form>
// 为了在使用ZIcon的时候  可以有组件提示 （在模板中） 需要配合volar
declare module 'vue' {
  export interface GlobalComponents {
    ZFormItem: typeof FormItem
    ZForm: typeof Form
  }
}
