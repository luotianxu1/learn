type FindUnionOne<T> = (
  T extends any ? (a: (p: T) => any) => any : never
) extends (a: infer R1) => any // 先转化成函数的联合类型 // 基于函数的分发实现对参数的交叉类型
  ? R1 extends (a: infer R2) => any
    ? R2
    : never
  : never;

type X1 = FindUnionOne<1 | 2 | 3 | any | 4>;

// (a:(p:1)=>any) | (a:(p:2)=>any) | (a:(p:3)=>any)
// (a:(p:1)=>any) & (a:(p:2)=>any) & (a:(p:3)=>any)

// 取出最后一项放到元祖中，之后在联合类型中排除掉当前这一项，递归取下一次的最后一项
export type UnionToTuple<T, L = FindUnionOne<T>> = [T] extends [never]
  ? []
  : [...UnionToTuple<Exclude<T, L>>, L];

type a = UnionToTuple<1 | 2 | 3 >; // [1,2,3]

// > https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md

type X = ((p: string) => { a: string }) &
  ((p: number) => { b: string }) &
  ((p: boolean) => { c: string });

type Paramaters<T> = T extends (p: any) => infer R ? R : never; // 会返回重载的最后一个结果

type x = Paramaters<X>;
// let x: X = (
//   p: string | number | boolean
// ): { a: string; b: string; c: string } => {
//   return { a: "1", b: "2", c: "3" };
// };

// function x3(p: string): { a: string };
// function x3(p: number): { b: string };
// function x3(p: boolean): { c: string };
// function x3(p: string | number | boolean): { a: string; b: string; c: string } {
//   return { a: "1", b: "2", c: "3" };
// }
