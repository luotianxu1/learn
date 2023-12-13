import { RemoveFirst } from "./9.KebabCase";

export type ObjectAccessPaths<
  T extends object,
  F extends string = "",
  K = keyof T // 获得第一层中的key
> = K extends keyof T
  ? T[K] extends object // 取值看是否是对象，如果是对象 就将key 拼接到结果集中
    ? ObjectAccessPaths<T[K], `${F}.${K & string}`>
    : RemoveFirst<`${F}.${K & string}`, "."> // 最终将最后不是对象的拼接起来即可
  : any;

function createI18n<Schema extends object>(
  schema: Schema
): (path: ObjectAccessPaths<Schema>) => void {
  return (path) => {};
}
// .home.topBar
const i18n = createI18n({
  home: {
    topBar: {
      title: "顶部标题",
      welcome: "欢迎登录",
    },
    bottomBar: {
      notes: "XXX备案，归XXX所有",
    },
  },
  login: {
    username: "用户名",
    password: "密码",
  },
});

i18n("home.topBar.title"); // correct
i18n("home.topBar.welcome"); // correct
i18n("home.bottomBar.notes"); // correct

// i18n("home.login.abc"); // error，不存在的属性
// i18n("home.topBar"); // error，没有到最后一个属性
