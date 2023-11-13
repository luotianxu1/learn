const path = require('path');
function loader(cssSource) {//module.exports="#root {\n  color: red;\n}\n"
  //`module.exports=${JSON.stringify(cssSource)}`;
  /* let css = cssSource.match(/module.exports="(.+?)"/)[1];
  let script = `
     let style = document.createElement("style");
     style.innerHTML = ${JSON.stringify(css.replace('\n', ''))};
     document.head.appendChild(style);
  `;
  return script; */
}
//request = style-loader!less-loader!index.less
//当前在style-loader,remainingRequest=less-loader!index.less
loader.pitch = function (remainingRequest) {
  //webpack根据文件后缀，根据你配置的loader,找到的使用的所有的loader
  //!!C:/5.loader\my-loaders\less-loader.js!C:\5.loader\src\index.less
  //remainingRequest是一个字符串，loader的绝对路径加上要加载的文件的绝对路径，用!拼接在一起
  //console.log('remainingRequest', remainingRequest);
  //这个内联是手工实现
  let script = `
     let style = document.createElement("style");
     //因为webpack在分析require依赖的时候，要找此文件对应的loader,如果发现!!，不再找配置的loader
     //只加载行内loader,另外会把它们作为一个单独的模块来处理
     style.innerHTML = require(${stringifyRequest(this, "!!" + remainingRequest)});
     document.head.appendChild(style);
  `;
  return script;
}
//把loader和文件从绝对路径变为相对路径
function stringifyRequest(loaderContext, request) {
  const prefixReg = /^-?!+/;
  const prefixRequest = request.match(prefixReg);
  const prefix = prefixRequest ? prefixRequest[0] : '';//prefix=!!
  //[C:/5.loader\my-loaders\less-loader.js,C:\5.loader\src\index.less]
  const splitted = request.replace(prefixReg, '').split('!');
  const { context } = loaderContext;//loaderContext.context指的是项目的根目录
  // "!!./my-loaders/less-loader.js!./src/index.less"
  return JSON.stringify(prefix + splitted.map(part => {
    part = path.relative(context, part);//获对此文件路径相对于项目根目录的相对路径
    if (part[0] !== '.') part = "./" + part;
    return part.replace(/\\/g, '/');
  }).join('!'));
}
module.exports = loader;