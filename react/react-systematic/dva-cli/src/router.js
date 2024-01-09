import React from "react";
import { Router, Route, Switch, Redirect } from "dva/router";
import routes from "./routerRoutes";
// antd
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import "lib-flexible";
import "./index.less";

// 动态路由
// 根据路由表，动态创建路由匹配机制
const Element = function Element(props) {
  let { component: Component, history, location, match } = props;
  let config = { history, location, match };
  return <Component {...config}></Component>;
};

const createRoute = (routes) => {
  return (
    <Switch>
      {routes.map((item, index) => {
        let { path, exact, meta, redirect } = item;
        let config = {};
        if (redirect) {
          config = { from: path, to: redirect };
          if (exact) config.exact = exact;
          return <Redirect key={index} {...config}></Redirect>;
        }
        config = { path };
        if (exact) config.exact = exact;
        return (
          <Route
            key={index}
            {...config}
            render={(props) => {
              let title = meta.title || "";
              document.title = title;
              return <Element {...props} {...item} />;
            }}
          ></Route>
        );
      })}
    </Switch>
  );
};

export default function RouterConfig({ history }) {
  return (
    <ConfigProvider locale={zhCN}>
      <Router history={history}>{createRoute(routes)}</Router>
    </ConfigProvider>
  );
}

export const LevelTwoRouterConfig = function LevelTwoRouterConfig({ path }) {
  let item = routes.find((item) => item.path === path);
  let children = item.children;
  if (!children) return null;
  return createRoute(children);
};
