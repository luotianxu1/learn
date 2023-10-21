const babel = require('@babel/core')
const types = require('@babel/types')
const transformEs2015ArrowFunctions = require('babel-plugin-transform-es2015-arrow-functions')

const transformEs2015ArrowFunctions2 = {
    visitor: {
        ArrowFunctionExpression(path) {
            const { node } = path
            hoistFunctionEnvironment(path)
            node.type = 'FunctionExpression'
            const body = node.body
            if (!types.isBlockStatement(body)) {
                node.body = types.blockStatement([types.returnStatement(body)])
            }
        },
    },
}

function hoistFunctionEnvironment(path) {
    const thisEnv = path.findParent((parent) => {
        return (
            (parent.isFunction() && !path.isArrowFunctionExpression()) ||
            parent.isProgram()
        )
    })
    let thisBindings = '_this'
    let thisPaths = getThisPaths(path)
    if (thisPaths.length > 0) {
        thisEnv.scope.push({
            id: types.identifier(thisBindings),
            init: types.thisExpression(),
        })
    }
    thisPaths.forEach((thisPath) => {
        thisPath.replaceWith(types.identifier(thisBindings))
    })
}

function getThisPaths(path) {
    let thisPaths = []
    path.traverse({
        ThisExpression(thisPath) {
            thisPaths.push(thisPath)
        },
    })
    return thisPaths
}

const sourceCode = `
const sum = (a,b)=> a+ b
`

const result = babel.transform(sourceCode, {
    plugins: [transformEs2015ArrowFunctions2],
})
console.log(result.code)
