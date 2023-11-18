// 类：类的组成部分： 构造函数、属性（实例属性、原型属性）、方法（实例方法、原型方法、访问器）  静态的属性和方法

// 所有的实例上的属性都需要先声明再使用
class Circle {
  // 默认值、可选参数、剩余运算符
  x: number;
  y: number;
  constructor(x: number, y: number = 0, ...args: number[]) {
    this.x = x;
    this.y = y;
  }
}
let circle = new Circle(100);
console.log(circle);

// 类的修饰符  public (公开的 我自己、我的儿子、外界)  protected (受保护的 我自己、我的儿子)  private（私有的 private）
// readonly 仅读的

class Animal {
  //   public name!: string;
  //   public age!: number;
  constructor(public readonly name: string, public age: number) {
    // 直接在参数中添加 public prvitate protected 这些属性会默认添加到实例
    // this.name = name;
    // this.age = age;
    this.name = "abc"; // 因为在构造函数中是初始化阶段 readonly的值是可以修改的
  }
  //   changeName(name: string) {
  //     this.name = name; // 这里如果是readonly属性则不能再修改了
  //   }
}
class Cat extends Animal {
  public address; // 属性
  constructor(name: string, age: number) {
    super(name, age); // Animal.call(this,name,age);

    this.address = "美国"; // 添加类中的属性
    // this.name = "abc";
  }
}
let cat = new Cat("Tom", 10);

console.log(cat.age, cat.name);

// 属性 分为 静态属性 实例属性  原型属性  （实例和原型的区别）  原型是共享的， 实例就是每个人都有的

class Animal1 {
  static type = "哺乳类";
  // 类中如何声明原型属性？
  private _name: string = "Tom";
  get name() {
    // 类的访问，访问的是 原型上的属性
    return this._name;
  }
  set name(newValue) {
    this._name = newValue;
  }
}

// let animal1 = new Animal1();
// let animal2 = new Animal1();
// console.log(Animal1.type);

// 子类中重写父类的方法 要求必须和父类的方法类型一致
class Animal2 {
  static getType() {
    console.log("父");
    return "哺乳类";
  }
  public eat: () => void; // 实例方法
  constructor() {
    this.eat = () => {};
  }
  say(): void {
    console.log("父 say");
  } // 不关心返回值 原型方法
}
class Mouse extends Animal2 {
  static getType() {
    // 调用父类
    console.log("子");
    super.getType();
    return "哺乳类";
  }
  say() {
    // 兼容父类，组合优先于继承
    // 子类可以随便实现
    console.log("子的say");
    super.say();
    return "abc";
  }
}
console.log(Mouse.getType());
let mouse = new Mouse();
mouse.say();
// super 父类  、 父类的原型

// 正常类中： 原型属性 (get xxx 属性访问器来实现) 、原型方法 Animal.prototype
// 实例属性 实例方法  声明在实例上的
// 静态属性 静态方法  类上的
// super 在构造函数中、静态方法中super指向的是父类
// 在原型方法中super指向的是父类的原型

// 实例属性要提前声明  修饰符 private protected public readonly

// 构造函数中增加了 private 和 protected 意味着不能再被new了

class Singleton {
  static instance = new Singleton();
  private constructor() {}
  static getInstance() {
    return this.instance;
  }
}

// 单例模式
let instance1 = Singleton.getInstance();
let instance2 = Singleton.getInstance();
console.log(instance1 === instance2);

// 不能被new的 可以采用抽象类， 抽象类中可以采用抽象方法

abstract class Person {
  // 抽象类中可以有非抽象的方法
  drink() {
    console.log("drink");
  }
  // abstract eat: () => void;
  abstract eat(): void; // 需要子类来实现一个eat方法
}
class Teacher extends Person {
  // eat(){}
  eat: () => void;
  constructor() {
    super();
    this.eat = function () {
      return 123;
    };
  }

  // eat(): void {
  //   console.log("eat");
  // }
}
new Teacher();
// 装饰器
export {};
