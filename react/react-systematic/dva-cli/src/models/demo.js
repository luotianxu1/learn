export default {
  namespace: "demo", // 命名空间
  state: {
    num: 10,
  }, // 公共状态
  subscriptions: {}, // 在这里订阅的方法，会在页面已加载就会被通知执行
  reducers: {}, // 以一个个方法的模式，完成reducer中派发行为标识的判断以及状态的更改
  effects: {}, // 基于redux-saga实现异步操作，异步派发
};
