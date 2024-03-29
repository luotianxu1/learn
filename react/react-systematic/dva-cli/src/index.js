import dva from "dva";
import "@babel/polyfill";
import createHistory from "history/createHashHistory";
import voteModel from "./models/vote";
import createLoading from "dva-loading";
import createLogger from "redux-logger";

// 1. Initialize
const app = dva({
  // 指定路由模式，默认是哈希路由
  history: createHistory(),
  // 扩展其他的中间件 例如redux-logger/redux-persist
  extraEnhancers: [],
  onAction: [createLogger()],
  initialState: {
    // demo: {
    //   num: 100,
    // },
  },
});
window.app = app;

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(voteModel);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
