function loader(cssSource, map, ast) {
  return `module.exports=${JSON.stringify(cssSource)}`;
}
module.exports = loader;
//css-loader有二个功能，一个是处理url @import