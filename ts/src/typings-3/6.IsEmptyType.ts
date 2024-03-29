export type IsEmptyType<T> = keyof T extends never
  ? unknown extends T // unknown 只能赋予给unknown
    ? false
    : boolean extends T // {} 意味着可以接受任何的类型
    ? true
    : false
  : false;
type A = IsEmptyType<string>; // false
type B = IsEmptyType<{ a: 3 }>; // false
type D = IsEmptyType<any>; // false
type F = IsEmptyType<Object>; // false
type G1 = IsEmptyType<never>; // false
type C = IsEmptyType<{}>; // true
type E = IsEmptyType<object>; // false
type G = IsEmptyType<unknown>; // false
