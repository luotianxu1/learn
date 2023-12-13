export type FirstChar<T> = T extends `${infer L}${string}` ? L : never;

type A = FirstChar<"BFE">; // 'B'
type B = FirstChar<"dev">; // 'd'
type C = FirstChar<"">; // never
