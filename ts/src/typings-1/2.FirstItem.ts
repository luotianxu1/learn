export type FirstItem<T extends any[]> = T[0];
type A = FirstItem<[string, number, boolean]>; // string
type B = FirstItem<["B", "F", "E"]>; // 'B'
