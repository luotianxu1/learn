const pathLib = require('path');
const babel = require('@babel/core');
const types = require('@babel/types');
const AnnotationMap = {
    TSNumberKeyword: 'NumericLiteral'
}
const tscCheckPlugin = () => {
    return {
        pre(file) {
            file.set('errors', []);
        },
        visitor: {
            VariableDeclarator(path, state) {
                const errors = state.file.get('errors');
                //NumberTypeAnnotation
                const idType = AnnotationMap[path.node.id.typeAnnotation.typeAnnotation.type];
                //StringLiteral NumericLiteral
                const initType = path.node.init.type;
                if (idType !== initType) {
                    Error.stackTraceLimit = 0;
                    errors.push(
                        path.get('init').buildCodeFrameError(`无法把${initType}赋值给${idType}`, Error)
                    );
                }
            }
        },
        post(file) {
            console.log(...file.get('errors'));
        }
    }
}

let sourceCode = `
  var age:number = 12;
`;

const result = babel.transform(sourceCode, {
    parserOpts: { plugins: ['typescript'] },
    plugins: [tscCheckPlugin()]
})
console.log(result.code);
