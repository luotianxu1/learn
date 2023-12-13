export type RemoveFirst<T extends string, S> = T extends `${S &
  string}${infer R}` // 自己将指定的开头移除掉 
  ? R
  : T;

export type KebabCase<
  T extends string,
  F extends string = "" // 遇到 大写的转换成 -小写
> = T extends `${infer L}${infer R}`
  ? KebabCase<R, `${F}${Capitalize<L> extends L ? `-${Lowercase<L>}` : L}`>
  : RemoveFirst<F, "-">;

type a1 = KebabCase<"HandleOpenFlag">; // handle-open-flag
type a2 = KebabCase<"OpenFlag">; // open-flag
