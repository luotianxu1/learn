// html => render函数
// ast语法树
import { generate } from './generate'
import { parseHTML } from './parse'

export function compileToFunctions(template) {
    // 1、需要将html代码转化成ast语法树 可以用ast树来描述语言本身
    let ast = parseHTML(template)
    // 2、优化静态节点
    // 3、通过这棵树 重新生成代码
    let code = generate(ast)
    // 4、将字符串变成函数 通过with来进行取值 稍后调用render函数就可以通过该变this 让这个函数内部取到结果
    let render = new Function(`with(this){return ${code}}`)
    return render
}
