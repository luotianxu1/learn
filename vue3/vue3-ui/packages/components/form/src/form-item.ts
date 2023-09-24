import { PropType, ExtractPropTypes, InjectionKey } from 'vue'

import { RuleItem } from 'async-validator'

export type Arrayable<T> = T | T[]
export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string> // 出发规则
}

export const validateStates = ['success', 'error', ''] as const

export type ValidateStates = typeof validateStates[number]

export const formItemProps = {
  prop: String, // 校验的字段内容
  label: String, // 显示的内容标题
  rules: [Object, Array] as PropType<Arrayable<FormItemRule>>, // 对应当前formItem规则
  showMessage: {
    type: Boolean,
    default: true
  }
} as const

export type FormItemProps = ExtractPropTypes<typeof formItemProps>

export interface FormItemContext extends FormItemProps {
  validate: (
    trigger: string,
    callback?: (isValid: boolean) => void
  ) => Promise<void>
}
// errors: Array(1)
// 0: {message: '用户名是3-6位', fieldValue: '1', field: 'username'}
// length: 1
// [[Prototype]]: Array(0)
// fields:
// username: Array(1)
// 0: {message: '用户名是3-6位', fieldValue: '1', field: 'username'}
// length: 1
export type ValidateFieldsError = {
  message: string
  fieldValue: string
  fields: string
}
export interface ValidateError {
  errors: ValidateFieldsError[]
  fields: ValidateFieldsError
}

export const formItemContextKey: InjectionKey<FormItemContext> = Symbol()
