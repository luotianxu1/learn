export type Include<T extends string, C extends string> = T extends ""
  ? C extends ""
    ? true
    : false
  : T extends `${infer L}${C}${infer R}`
  ? true
  : false;

type a1 = Include<"Jiang", "J">; // true
type a2 = Include<"Jiang", "i">; // true
type a3 = Include<"", "">; // true 空字符串时需要特殊处理
type a4 = Include<"", "a">;
