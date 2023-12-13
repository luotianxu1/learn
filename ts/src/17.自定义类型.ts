// 自定义类型
type Compute<T extends object> = {
    [xxxx in keyof T]: T[xxxx] // 映射
}

// Exclude Extract集合的操作
// Pick Omit 对对象结构的操作
// Partial Required Readonly 起修饰作用的
// ReturnType Paramaters InstanceType .... (基于infer)

// Pick Omit 对对象结构的操作

// 让部分属性 变为可选属性 怎么办？

interface Company {
    num: number
    name: string
}
interface Person<T = any> {
    name: string
    age: number
    //   company: T;
    address: string
}

// 先将name属性挑出来变为可选的  &   除了name属性的

type PartialPropsOptional<T, K extends keyof T> = Partial<Pick<T, K>> &
    Omit<T, K>

type x1 = PartialPropsOptional<Person, 'name'>

// 以前是根据key 来选属性
// 根据值的类型 来选择 key

type PickKeysByValue<T extends object, U> = {
    // as 语法 映射成一个新的变量
    [K in keyof T as T[K] extends U ? K : never]: T[K]
}
type x2 = PickKeysByValue<Person, string>
/*
type isEqual<T, U, Success, Fail> = [T] extends [U]
  ? [U] extends [T]
    ? Success
    : Fail
  : Fail;

// {name:'name', age:never, address:‘address’,...}
type ExtractKeysByValueType<T, U, O = false> = {
  [K in keyof T]: isEqual<
    T[K],
    U,
    isEqual<O, true, never, K>,
    isEqual<O, true, K, never>
  >;
}[keyof T]; // 找到需要的属性 在通过属性选出来既可以了 name | address

// interface P {
//   name: "name";
//   age: "age";
//   c: never;
// }
// type x = P[keyof P];

type PickKeysByValue<T, U> = Pick<T, ExtractKeysByValueType<T, U>>;
type x2 = PickKeysByValue<Person, string>;

// 如果是Omit如何编写?

type OmitKeysByValue<T, U> = Pick<T, ExtractKeysByValueType<T, U, true>>;
type x3 = OmitKeysByValue<Person, string>;

*/

// 求对象的交集 Pick Omit Exclude Extract

// 求交集 （name:string,address:number）

type ObjectInter<T extends object, U extends object> = Pick<
    U,
    Extract<keyof T, keyof U> // name,address
>

type X1 = ObjectInter<A, B>

// 求对象的差集  B - A . Omit+Extract == Pick + Exclude
type ObjectDiff<T extends object, U extends object> = Omit<
    U,
    Extract<keyof T, keyof U> // name,address
>
type X2 = ObjectDiff<A, B>

type ObjectComp<T extends object, U extends T> = Omit<
    U,
    Extract<keyof T, keyof U> // name,address
>
// type X3 = ObjectComp<B, A>; // 求补集

// 重写A 类型？
type A = {
    name: string
    age: number
    address: string
}

type B = {
    name: string
    address: number
    male: boolean
}

// A=> {name:string,age:number,address:number}

type Overwrite<T extends object, U extends object> = ObjectInter<A, B> &
    ObjectDiff<B, A>

type X4 = Compute<Overwrite<A, B>>

// 类型互斥问题
interface Man1 {
    fortune: string // 有钱的男人
    // funny?: never;
}
interface Man2 {
    funny: string // 风趣的
    // fortune?: never;
}
interface Man3 {
    foreign: string
}

type Discard<T, U> = {
    [K in Exclude<keyof U, keyof T>]?: never
}

type OrType<T, U> = (Discard<T, U> & T) | (Discard<U, T> & U)

type ManType = OrType<Man1, OrType<Man2, Man3>>

let type: ManType = {
    foreign: '',
    // funny: undefined,
}

// 我将对方的属性标识成never

// let man: ManType = {
//   fortune: "有钱",
//   // foreign: "",
// };

export {}
