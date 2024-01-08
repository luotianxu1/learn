import React from "react";
import { Router, Route, Switch } from "dva/router";
import Vote from "./routes/Vote";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import "lib-flexible";
import "./index.less";

const RouterConfig = function RouterConfig({ history }) {
  return (
    <ConfigProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Vote} />
        </Switch>
      </Router>
    </ConfigProvider>
  );
};

export default RouterConfig;
