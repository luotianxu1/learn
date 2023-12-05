// 内置类型 Exclude Extract NonNullable infer ReturnType Paramters InstanceType ....

// 集合 、条件来操作的

// 常用的内置类型 基于对象操作 (映射类型)

type A1 = { name: string };
type A2 = { age: number }; // 交出来的是子类 {name:string,age:number}

type Compute<T extends object> = {
  [xxxx in keyof T]: T[xxxx]; // 映射
};
type A1A2 = Compute<A1 & A2>;

// 内置类型中有对对象属性进行修饰操作的   （必选属性、可选属性、仅读的属性...）

// partial / required / readonly 通过映射类型添加 ? readonly -? 修饰符

// Pick Omit 对象的结构操作

// Record -> 取代object的 对象类型

interface Company {
  num: number;
  name: string;
}
interface Person<T = any> {
  name?: string;
  age?: number;
  company: T;
}

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]; // 将所有属性 都增加可选标识， 默认只做了第一层处理
};

type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K]; // 将所有属性 都增加可选标识， 默认只做了第一层处理
};

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]; // 将所有属性 都增加可选标识， 默认只做了第一层处理
};
type DeepMutate<T> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutate<T[K]> : T[K]; // 将所有属性 都增加可选标识， 默认只做了第一层处理
};
type withCompany = DeepMutate<DeepReadonly<Person<Company>>>;

let person: withCompany = {
  name: "xxx",
  age: 30,
  company: {
    name: "xxx",
    num: 110,
  },
};

// Pick 挑选  Omit 去掉某些属性 （Exclude Extract）

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
// for(let P in 'name' | 'age'){
//     T[P]
// }

// keyof any => number | string | symbol
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type PickPerson = Omit<Person, "name" | "age">;

// T extends object ->   Record<string, any>
let obj: Record<string, any> = { name: "jw", age: 30 }; // -> ['jw',30]

function map<K extends string, V, R>(
  obj: Record<K, V>,
  callback: (item: V, key: K) => R
) {
  let result = {} as Record<K, R>;
  for (let key in obj) {
    result[key] = callback(obj[key], key);
  }
  return result;
}

// 1) 根据传入的值进行类型推导 name和age 会赋予给K  ’jw‘30 会赋予给V
// 2) 拿到callback的返回值  R 会根据你的返回值来推导 string (string | number + string = string)
// 3) 映射成一个新的record 这个新的record 由 K 和 R组成

type Record<K extends number | string | symbol, T> = { [P in K]: T }; // record 就是一个对象
// Record<string,number> => { string: number };
// Record<'name'|'age',number> => { age: number,name:number };
map({ name: "jw", age: 30 }, (item, key) => {
  return 1;
});
// {name:'jwname',age:'30age'}

export {};
