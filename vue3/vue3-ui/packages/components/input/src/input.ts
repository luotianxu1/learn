// modelValue => v-model = :value + onUpdate:modelValue 事件
// type -> text / password
// placeholder
// clearable
// show-password
// disabled
//readonly
// label

import { ExtractPropTypes, PropType } from 'vue'
import { isString } from '@vue/shared'

export const inputProps = {
  modelValue: {
    type: [Number, String] as PropType<number | string>,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String
  },
  clearable: Boolean,
  showPassword: {
    type: Boolean,
    default: false
  },
  disabled: Boolean,
  readonly: Boolean,
  label: String
} as const

export const inputEmits = {
  'update:modelValue': (value: string) => isString(value),
  input: (value: string) => isString(value),
  change: (value: string) => isString(value),
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  clear: () => true
}

export type IconProps = ExtractPropTypes<typeof inputProps>

export type InputEmits = typeof inputEmits
