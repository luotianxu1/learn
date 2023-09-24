// size
// type
// round
// loading
// disabled
// nativ-type

import { ExtractPropTypes, PropType } from 'vue'

// 插槽 支持icon slot
// icon的位置 icon-placement left righgt

export type Size = 'small' | 'medium' | 'large'

export type Type =
  | 'primary'
  | 'success'
  | 'wraning'
  | 'danger'
  | 'info'
  | 'default'
  | ''
export const buttonProps = {
  size: String as PropType<Size>,
  type: {
    type: String as PropType<Type>,
    validator: (type: string) => {
      // validator 必须采用箭头函数的写法
      return [
        'primary',
        'success',
        'wraning',
        'danger',
        'info',
        'default',
        ''
      ].includes(type)
    }
  },
  round: Boolean,
  loading: Boolean,
  disabled: Boolean,
  nativeType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  iconPlacement: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  }
} as const

export const buttonEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent,
  mousedown: (e: MouseEvent) => e instanceof MouseEvent
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits
