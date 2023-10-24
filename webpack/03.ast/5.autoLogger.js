const importModule = require('@babel/helper-module-imports')
const pathLib = require('path')
const babel = require('@babel/core')
const types = require('@babel/types')
const template = require('@babel/template')
const autoLoggerPlugin = ({ libName }) => {
    return {
        visitor: {
            Program(path, state) {
                let loggerId
                path.traverse({
                    ImportDeclaration(path) {
                        const { node } = path
                        if (libName === node.source.value) {
                            const specifier = node.specifiers[0] ///如果层级比较 浅，直接取很方便
                            //const specifier = path.get('specifiers.0').node;//如果层级比较 深，get比较  a.b.c.d.e.f aPath.get('f')
                            loggerId = specifier.local.name
                            path.stop() //跳出剩下的遍历 for break
                        }
                    },
                })
                if (!loggerId) {
                    loggerId = path.scope.generateUid(libName)
                    const importDeclaration = types.importDeclaration(
                        [
                            types.importDefaultSpecifier(
                                types.identifier(loggerId)
                            ),
                        ],
                        types.stringLiteral(libName)
                    )
                    path.node.body.unshift(importDeclaration)
                }
            },
        },
    }
}
//希望能够扫描所有的console.log warn error debug 自动给方法添加参数 log所在的文件名 行 列
let sourceCode = `
  function sum(a,b){
      return a+b
  };
  const minus = (a,b)=>a-b;
  const multiply = function(a,b){
      return a*b
  }
  class Calculator{
      divide(a,b){
          return a/b;
      }
  }
`

const result = babel.transform(sourceCode, {
    plugins: [autoLoggerPlugin({ libName: 'logger' })],
})
console.log(result.code)
