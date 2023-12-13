export type IsAny<T> = unknown extends T
  ? [T] extends [boolean]
    ? true
    : false
  : false;

type A = IsAny<string>; // false
type B = IsAny<any>; // true
type C = IsAny<unknown>; // false
type D = IsAny<never>; // false

// 严格区分 any 和 unknown 的区别

// type x1 = unknown extends any ? true : false;
// type x2 = any extends unknown ? true : false;
