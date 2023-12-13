// 类型声明
// 我们编写的类型 在最终编译的时候都会被删除， 为了让别人拥有代码提示。 用ts写的代码打包后可以生成声明文件

// 我下载了一个早期的非ts的包，在我的项目中用就报错了
// 我们通过CDN引入的包
// 引入了一个不是ts的文件 .vue .md .png .css
// 我想去再全局上扩展的属性使用
// 自己编写声明文件

// 声明类型声明的方式 declare 这都是类型，相当于告诉vscode 别报错了

// let person: Person = {
//   a: "abc",
// };
// let x: xxx = "abc";
// console.log(person);
// $(".bo100x").height(300).width(100);
// $.ajax("/login", { method: "get" });
// $.fn.extend({});

// import mitt from "mitt";
// import type { Listener } from "mitt";

// import url from "1.jpg";

// let fn: Listener = (...args) => {
//   console.log(args);
// };
// mitt.on("data", fn);

// mitt.emit("data", "a", "b");

// mitt.off("data", fn);

// 默认查找第三方类型 会先查找当前同名的包下面有没有 package.json > types 有就采用制定的问题
// 如果没有types 就查找 当前包有没有index.d.ts，如果没有继续查找
// 查找当前@types 目录下是否有此模块，找对应的同名的文件夹下的声明文件. 如果没有对应的包

// 如果没有 就会提示报错，你可以自己编写类型
// 想指定ts的查找路径 可以使用 types字段 (指定后先找自己的再找第三方的)
// import _ from "lodash";

// 三斜线指令  1) path 引入自己的声明，给路径 2) types 依赖的第三方模块   3） lib ts内置的类型声明 放到页面顶部才能正常使用

String.prototype.double = function () {
  return (this as string) + this;
};

window.a = 100;

// 扩展全局变量或者属性

export {};
