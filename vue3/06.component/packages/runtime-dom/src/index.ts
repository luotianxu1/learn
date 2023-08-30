import { nodeOps } from './nodeOps'
import { patchProp } from './patchProp'
import { createRenderer } from '@vue/runtime-core'

const renderOptions = Object.assign(nodeOps, { patchProp })

export function render(vnode, container) {
    let { render } = createRenderer(renderOptions)
    return render(vnode, container)
}

export * from '@vue/runtime-core'
