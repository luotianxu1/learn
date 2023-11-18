// 接口 抽象类（有抽象的和非抽象的）和接口（都是抽象的） 接口没有具体的实现
// 用来描述形状的 （结构）  定义结构到时候让用户去实现

// 描述形状（对象、类、函数、混合类型）
// 定义一些含没有实现的内容

// type IFullname = {
//   firstname: string;
//   lastname: string;
// };
interface IFullname {
  firstname: string;
  lastname: string;
}
const getFullName = ({ firstname, lastname }: IFullname) => {
  return firstname + lastname;
};
getFullName({ firstname: "j", lastname: "w" });

// type 和 interface的区别
// interface 通常描述 对象、类的结构比较多，type来描述函数的签名、联合类型、 工具类型、映射条件类型
// 在描述的时候 尽量用type。 不能用考虑interface

// type 优点：可以用联合类型 type 不能重名 , type中可以用后续的条件类型、映射
// interface 能重名、可以被扩展和实现、继承、混合类型

// 方法计数器， 调用+1

interface ICount {
  count: number;
  (): number;
}

// 因为let声明的变量可以修改，改了后可能属性就不存在了，意味着可能访问不到。 不安全
const counter: ICount = () => {
  return counter.count++;
};
counter.count = 0;

// 对象采用接口来实现 描述后端返回的数据结构

interface IVeg {
  // 接口叫抽象的没有具体实现
  color: string;
  taste: string;
  size: number;
  // 对象的key 可以有三种类型 string number symbol
  //  [key: string]: any; // 任意属性
}
interface IVeg {
  readonly xx?: number;
}
// interface IVegWithX extends IVeg {
//   xx?: number;
// }
// 1）断言后可以直接赋值, 但是不能取多余的属性，因为不知道有没有
// 2) 采用可选属性来标识
// 3) 我在基于当前类型声明一个新的类型
// 4) 同名接口可以合并
// 5) 可以采用任意类型
// .... &  兼容性...
// let veg: IVeg = {
//   color: "red",
//   taste: "sour",
//   size: 10,
//   xx: 1,
// } as IVeg;
let veg: IVeg = {
  color: "red",
  taste: "sour",
  size: 10,
  xx: 100,
};

// 任意类型 -》 索引类型
interface IArr {
  [key: number]: any; // 可能是数字索引、数组
}
const arr: IArr = [1, 2, 3, "abc"];
const obj: IArr = {
  0: 100,
  "1": 10,
  2: 200,
};

// 可以通过索引访问符来访问接口中的属性类型

interface Person {
  name: string;
  age: string;
  address: {
    num: 316;
  };
  // [key: string]: any;  如果写了任意类型，则去出的val 就是任意类型
}
type PersonName = Person["name"];
type PersonNum = Person["address"]["num"]; // 316
type PropTypeUnion = keyof Person; // 取key name | age | address
type PropTypeValueUnion = Person[keyof Person]; // 取值 string | {num:316}

// 接口最常用的就是描述对象，可以通过索引操作【】来访问内部类型

// 类接口, 描述类中的属性和方法。
interface Speakable {
  name: string;
  speak(): void; // 原型方法 还是实力方法
}
interface SpeakChinese {
  speakChinese(): void;
}
interface SpeakEngilsh extends Speakable, SpeakChinese {
  speakEnglish(): void;
}
// 实现某个类型
class Speak implements SpeakEngilsh {
  speakEnglish(): void {
    throw new Error("Method not implemented.");
  }
  name!: string;
  speak(): void {
    throw new Error("Method not implemented.");
  }
  speakChinese(): void {
    throw new Error("Method not implemented.");
  }
}

// 描述构造函数类型. 类类型 描述的是实例，想获取到类本身的类型 需要采用 typeof 获取
class Animal {}
class Meat {}
// typeof Class
interface Clazz<Txx> {
  new (): Txx;
}
// typeof Clazz -> new (): Clazz;
// 泛型类似于函数的参数 , 泛型的声明一般采用一个大写（开头）字母来表示
function createInstance<Txx>(clazz: Clazz<Txx>) {
  return new clazz();
}
let instance = createInstance(Animal); // 类似的映射关系，是在使用的时候定义的

export {};
