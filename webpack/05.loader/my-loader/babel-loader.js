const babel = require('@babel/core')
const path = require('path')
function loader(source) {
    let options = this.getOptions()
    const { code } = babel.transformSync(source, options)
    return code
}
module.exports = loader
/**
 * babel-loader其实是一个函数，用来接收老代码，返回新代码的
 * @babel/core 负责把源代码转成AST抽象语法树，然后遍历语法树，生成新的代码
 * core并不认识具体的语法，也不会转换任何语法
 * @babel/transform-arrow-functions可以识别箭头函数语法，并且把箭头函数转换成普通函数
 * 因为语法太多，每个语法都需要插件，插件很多，可以把多个插件打包在一起形成预设 @babel/preset-env
 */
