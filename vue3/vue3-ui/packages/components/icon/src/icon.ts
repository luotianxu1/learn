import { ExtractPropTypes, PropType } from 'vue'

// vue props 类型校验, props 需要时仅读的
export const iconProps = {
    size: [Number, String] as PropType<number | string>,
    color: String,
} as const

// 获取props的类型
export type IconProps = ExtractPropTypes<typeof iconProps>
