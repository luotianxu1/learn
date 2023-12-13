// 模块  es6 module

// 模块的特点 如果你在当前文件夹下 写了 import export 这个时候会产生一个独立的作用域

// 在ts中除了 import 和 export之外还有一个 兼容 commonjs规范 amd规范

// const a = require("./module/a");
// import a from "./module/a";
// import a = require("./module/a"); // 大部分都采用es6语法

// es6中的模块语法 在ts中都可以使用。

// 外部模块
// 内部模块 namespace 命名空间 -> 自执行函数

// 命名空间中声明的变量或者方法、类都需要导出才能使用.虽然命名空不导出 代码不报错但是无法运行

import { Zoo } from "./module/a";

console.log(Zoo.Dog);
