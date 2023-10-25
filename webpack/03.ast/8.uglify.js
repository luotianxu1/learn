const pathLib = require('path');
const babel = require('@babel/core');
const types = require('@babel/types');
const uglifyPlugin = () => {
    return {
        pre(file) {
            file.set('errors', []);
        },
        //捕获那些能够 生成作用域的节点 函数 类的函数 函数表达 语句块 if while for
        visitor: {
            //这是一个别名=  函数|类的函数|函数表达|语句块|if|while|for
            Scopable(path){
                //取出此作用域内所有的变量进行重命名 scope.bindings 当前作用域内声明所有变量
                Object.entries(path.scope.bindings).forEach(([key,bindings])=>{
                    const newName = path.scope.generateUid('a');
                    bindings.path.scope.rename(key,newName);
                });
            }
        },
        post(file) {
            console.log(...file.get('errors'));
        }
    }
}
//把变量从有意义变成无意义，而且变量名尽可能短 _ a x
let sourceCode = `
  function getAge(){
      var age = 12;
      console.log(age);
      var name = 'zhufeng';
      console.log(name);
  }
`;

const result = babel.transform(sourceCode, {
    parserOpts:{plugins:['typescript']},
    plugins: [uglifyPlugin()]
})
console.log(result.code);
