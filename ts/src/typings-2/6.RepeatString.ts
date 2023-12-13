export type RepeatString<
  T extends string,
  C,
  A extends any[] = [],
  F extends string = ""
> = C extends A["length"] ? F : RepeatString<T, C, [...A, null], `${F}${T}`>;

type A = RepeatString<"a", 3>; // 'aaa'
type B = RepeatString<"a", 0>; // ''
