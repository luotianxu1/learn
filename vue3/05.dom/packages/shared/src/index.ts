export const isObject = (value) => {
    return typeof value === 'object' && value !== null
}

export const isFunction = (value) => {
    return typeof value === 'function'
}

export function isString(value) {
    return typeof value === 'string'
}

export * from './shapeFlag'
