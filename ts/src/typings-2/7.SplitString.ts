export type SplitString<
  T,
  S extends string,
  F extends any[] = []
> = T extends `${infer L}${S}${infer R}`
  ? SplitString<R, S, [...F, L]>
  : [...F, T];
// flag extends  -flag
type A1 = SplitString<"handle-open-flag", "-">; // ["handle", "open", "flag"]
type A2 = SplitString<"flag", "-">; // ["open", "flag"]
type A3 = SplitString<"handle.open.flag", ".">; // ["handle", "open", "flag"]
type A4 = SplitString<"open.flag", ".">; // ["open", "flag"]
type A5 = SplitString<"open.flag", "-">; // ["open.flag"]
