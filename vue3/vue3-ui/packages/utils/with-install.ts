import { Component, ComputedOptions, MethodOptions, Plugin } from 'vue'

// 增加install方法
export type SFCWithInstall<T> = T & Plugin

export function withInstall<T>(comp: T) {
    ;(comp as SFCWithInstall<T>).install = function (app) {
        let { name } = comp as unknown as { name: string }
        app.component(
            name,
            comp as Component<any, any, any, ComputedOptions, MethodOptions>
        )
    }
    return comp as SFCWithInstall<T>
}
