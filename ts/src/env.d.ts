// 这些声明文件不要写在业务代码中，统一管理 .d.ts
declare let age: number;
declare function sum(a: string, b: string): string;
declare class Person {}
declare const enum Seasons {
  Spring,
  Summer,
}
declare interface Person {
  a: string;
}
declare type xxx = "abc";

interface JQuery {
  // 重载
  height(num?: number): this;
  width(num: number): this;
  extend(obj: object): this;
}
declare const $: {
  (selector: string): JQuery;
  ajax(url: string, options: Record<string, any>): void;
  fn: JQuery;
};

// 自己在业务中解决 代码中使用的变量不存在的问题

declare module "mitt" {
  type Type = string | symbol;
  type Listener = (...args: unknown[]) => void;
  const on: (type: Type, listener: Listener) => void;
  const emit: (type: Type, ...args: unknown[]) => void;
  const off: (type: Type, listener: Listener) => Listener;
}

declare module "*.jpg" {
  const str: string;
  export default str;
}

declare module "*.scss" {
  const str: string;
  export default str;
}

// 全局的接口; 被合并上去了 不用+declare 内部用了declrea
interface String {
  double(): string;
}
declare interface Window {
  a: number;
}

// // }
