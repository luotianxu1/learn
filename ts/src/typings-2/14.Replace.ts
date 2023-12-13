export type Replace<
  T extends string,
  C extends string,
  RC extends string,
  F extends string = ""
> = C extends ""
  ? T extends "" // 做特殊处理
    ? RC
    : `${RC}${T}`
  : T extends `${infer L}${C}${infer R}`
  ? Replace<R, C, RC, `${F}${L}${RC}`>
  : `${F}${T}`;

// L = '' C = 'ha'  R = 其它的剩余的
// L = ' ' C = 'ha' R =  ha
type a1 = Replace<"ha ha ha 123", "ha", "he">;
type a2 = Replace<"jw", "jw", "jiangwen">;
type a4 = Replace<"", "", "jiangwen">;
type a3 = Replace<"a", "", "jiangwen">;
