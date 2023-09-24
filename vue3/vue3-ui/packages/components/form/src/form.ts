import { isString } from '@vue/shared'
import { ExtractPropTypes, InjectionKey, PropType, SetupContext } from 'vue'
import { FormItemContext, FormItemRule } from './form-item'

type FormRule = Record<string, FormItemRule[]>

export const formProps = {
  model: Object, // 所有的数据
  rules: Object as PropType<FormRule>, // 规则
  showMessage: {
    // 是否显示错误
    type: Boolean,
    default: true
  }
} as const

// form -> form-item  form-item -> input  prvoide  inject

export type FormProps = ExtractPropTypes<typeof formProps>

export interface FormContext extends FormProps {
  addFiled: (formItem: FormItemContext) => void
  emit: SetupContext<FormEmits>['emit']
}

export const formEmits = {
  validate: (props: string, isValid: boolean, message: string) =>
    isString(props) && typeof isValid === 'boolean' && isString(message)
}
export type FormEmits = typeof formEmits
export const formContextKey: InjectionKey<FormContext> = Symbol()
