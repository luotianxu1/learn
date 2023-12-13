export type LastChar<
  T extends string,
  F = never
> = T extends `${infer L}${infer R}` ? LastChar<R, L> : F;
type A = LastChar<"BFE">; // 'E' .    E
type B = LastChar<"dev">; // 'v'
type C = LastChar<"a">; // never

// 元组的取值很像
