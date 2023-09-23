// 用来创建bem规范的名字
// b -> block  e -> element  m-> modifier  is -> 状态

function _bem(
    prefixName: string,
    blockName: string,
    elementName: string,
    modifierName: string
) {
    if (blockName) {
        prefixName += `-${blockName}`
    }
    if (elementName) {
        prefixName += `__${elementName}`
    }
    if (modifierName) {
        prefixName += `--${modifierName}`
    }
    return prefixName
}

function createBEM(prefixName: string) {
    const b = (blockName = '') => _bem(prefixName, blockName, '', '')
    const e = (elementName = '') =>
        elementName ? _bem(prefixName, '', elementName, '') : ''
    const m = (modifierName = '') =>
        modifierName ? _bem(prefixName, '', '', modifierName) : ''
    // be em  bm  bem
    const be = (blockName = '', elementName = '') =>
        blockName && elementName
            ? _bem(prefixName, blockName, elementName, '')
            : ''

    const em = (elementName = '', modifierName = '') =>
        elementName && modifierName
            ? _bem(prefixName, '', elementName, modifierName)
            : ''
    const bm = (blockName = '', modifierName = '') =>
        blockName && modifierName
            ? _bem(prefixName, blockName, '', modifierName)
            : ''

    const bem = (blockName = '', elementName = '', modifierName = '') =>
        blockName && modifierName && elementName
            ? _bem(prefixName, blockName, elementName, modifierName)
            : ''

    const is = (name: any, state: any) => (state ? `is-${name}` : '')
    return {
        b,
        e,
        m,
        bm,
        em,
        bem,
        be,
        is,
    }
}

export function createNamespace(name: string) {
    const prefixName = `z-${name}`
    return createBEM(prefixName)
}

// let bem = createNamespace("button");
// console.log(bem.e("inner")); // z-button__inner
// console.log(bem.b("box")); // z-button-box
// console.log(bem.m("disabeld")); // z-button__inner
// console.log(bem.bm("box", "disabeld")); // z-button__inner
// console.log(bem.em("inner", "disabeld")); // z-button__inner
// console.log(bem.bem("box", "inner", "disabeld")); // z-button__inner
// console.log(bem.is("disabeld", "disabeld")); // z-button__inner
