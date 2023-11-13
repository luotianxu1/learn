const less = require('less')
/**
 *
 * @param {*} lessSource
 * @returns
 */
function loader(lessSource) {
    let cssSource
    //如果调用了this.async方法，就会把loader的执行从同步变成异步，只有当你手工调用callback的时候才会认为此loader执行结束
    //const callback = this.async();
    less.render(lessSource, { filename: this.resource }, (err, output) => {
        cssSource = output.css
        //callback(null, cssSource);
        this.callback(null, cssSource, output.map, output.ast)
    })
    //如果返回值只有一个的话可以用return ,如果多少
    //return cssSource;//返回的CSS文本
    //return `module.exports=${JSON.stringify(cssSource)}`;
    //return `module.exports = "#root{color:red}"`
}
module.exports = loader
//在真正的less-loader返回并不是css文本内容，而也是返回的js
//最左则的loader返回的一定是JS
/**
 * 1.如果有些loader的执行是异步
 */
