// 装饰器的概念： 本质就是一个函数，只能扩展类和类的成员

// function Decorator(target: any) {
//   // 给类本身添加属性和方法;
//   target.type = "动物";
//   target.getType = function () {
//     return this.type;
//   };
//   target.prototype.eat = function () {
//     console.log("eat");
//   };
//   target.prototype.drink = function () {
//     console.log("drink");
//   };
//   // 可以返回子类，这个子类用于重写父类
// }
// function OverrideAnimal(target: any) {
//   // 可以直接对父类进行重写
//   return class extends target {
//     eat() {
//       super.eat();
//       console.log("child eat");
//     }
//   };
// }

function Enum(isEnum: boolean) {
  // decorator
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    // descriptor writable 是否可写  value原来的值 ， enumerable是否可枚举 configurable是否能被删除
    descriptor.enumerable = isEnum;
    // console.log(target, key, descriptor);

    let original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      // 切片，装饰器
      console.log("eat prev ");
      original.call(this, ...args);
      console.log("eat next ");
    };
  };
}

function ValToUpper(prefix: string) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    let original = descriptor.set;

    descriptor.set = function (newVal) {
      original?.call(this, prefix + newVal.toUpperCase());
    };
  };
}
function ToUpper(target: any, key: string) {
  // vue2 observerable
  let value = "";
  console.log(target, key);
  Object.defineProperty(target, key, {
    // 重写类中的属性
    // enumerable: true,
    // configurable: true,
    get() {
      console.log("getter");
      return value.toUpperCase();
    },
    set(newValue) {
      console.log("setter");
      value = newValue;
    },
  });
}

function Params(target: any, key: string, index: number) {
  console.log(target, key, index); // 如果单独使用装饰器 没有任何意义
}

// 装饰器默认先执行离自己最近的，在向上执行
// @OverrideAnimal
// @Decorator
class Animal {
  private _value!: string;

  constructor() {
    this.name = "abc";
  }
  // @Enum(true) // 装饰器函数在修饰函数的成员函数的时候一定会执行
  // eat() {
  //   console.log("parent eat");
  // }
  // get value() {
  //   return this._value;
  // }
  // @ValToUpper("$")
  // set value(newVal) {
  //   this._value = newVal;
  // }
  @ToUpper
  public name?: string = "abc";

  play(@Params val: string) {}
}
let animal = new Animal();
animal.name = "abc";
console.log(animal.name);
// animal.value = "abc"; // Object.defineProperty
// console.log(animal.value);
// animal.eat();

// 在装饰器中的参数 对于类而言 装饰类的时候 参数是类本身 ， 其它都是类的原型

// 装饰器的执行流程
export {};
