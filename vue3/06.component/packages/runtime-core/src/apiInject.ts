import { instance } from './component'

export function provide(key, value) {
    if (!instance) return

    let parentprovides = instance.parent && instance.parent.provides

    let currentProvides = instance.provides

    if (parentprovides === currentProvides) {
        currentProvides = instance.provides = Object.create(parentprovides)
    }

    instance.provides[key] = value
}

export const inject = (key, defaultVal) => {
    if (!instance) {
        return
    }
    const provides = instance.parent.provides
    if (provides && key in provides) {
        return provides[key]
    } else {
        return defaultVal
    }
}
