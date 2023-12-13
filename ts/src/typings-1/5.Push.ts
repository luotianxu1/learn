export type Push<T extends any[], I> = [...T, I];
type A = Push<[1, 2, 3], 4>; // [1,2,3,4]
type B = Push<[1], 2>; // [1, 2]
