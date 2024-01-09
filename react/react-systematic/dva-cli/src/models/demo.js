const delay = (interval = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
};

export default {
  namespace: "demo", // 命名空间
  // 公共状态
  state: {
    num: 10,
  },
  // 以一个个方法的模式，完成reducer中派发行为标识的判断以及状态的更改
  reducers: {
    /**
     * 把原有reducer函数中的每一种switch/case情况都写成一个单独的方法【函数】
     * state：获取“本模块”的公共状态
     * action：派发时候传递的action对象【包含type和传递的其他值（一半基于payload字段传递）】
     * 我们需要把获取的state克隆一份，然后函数最后返回的值，会替换当前模块的state
     */
    increment(state, { payload = 1 }) {
      state = { ...state };
      state.num += payload;
      return state;
    },
  },
  // 基于redux-saga实现异步操作，异步派发
  effects: {
    /**
     * redux-saga中我们基于take/takeLatest/takeEvery等方式创建的监听器，此时写成一个个的“Generator”函数 ，默认是基于takeEvery的方式创建的监听器
     *  + 方法名就是我们创建的监听器名字
     *  + 方法就是派发的任务被监听后，执行的working方法
     *  + 此处的函数名，不要和reducers中的函数一致，因为：每一次派发，reducers和effects中的方法都会匹配执行，如果函数名一样，则状态修改两次，我们一般在effects写的名字，都加Async
     *
     * 方法中的参数
     *  + action 在组件中进行派发时，传递的action对象
     *  + 第二个参数就是redux-saga中提供的EffectsAPI但是没有delay/debounce
     *    + 基于yield select()可以获取所有模块的公共状态
     *      yield select(state => state.demo) 这样就是获取指定的状态信息
     */

    // *incrementAsync({ payload }, { call, put }) {
    //   try {
    //     yield call(delay, 2000);
    //     yield put({ type: "increment", payload });
    //   } catch (_) {}
    // },
    // 如果向设置不同的监听器
    incrementAsync: [
      function* ({ payload }, { call, put }) {
        yield call(delay, 2000);
        yield put({ type: "increment", payload });
      },
      { type: "takeLatest" },
    ],
  },
  // 在这里订阅的方法，会在页面已加载就会被通知执行
  /**
   * demoModel是被懒加载的，只有访问了/demo这个地址(组件),demoModel才会被注册
   *  这里订阅方法
   *  + 只有进入到这个组件，Model懒加载完毕，也被注册了，subscriptions中订阅的方法才被执行
   *  + 而且只会执行一次，后期路由来回切换的时候，也不再执行了
   */
  subscriptions: {
    setup() {
      console.log("DEMO");
    },
  },
};
