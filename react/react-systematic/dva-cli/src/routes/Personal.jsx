import React from "react";
import { NavLink, Switch, Route, Redirect } from "dva/router";
import { LevelTwoRouterConfig } from "../router";

const Personal = function Personal() {
  return (
    <div>
      <div className="menu">
        <NavLink to="/personal/order">我的订单</NavLink>
        <NavLink to="/personal/profile">我的信息</NavLink>
      </div>
      <div className="content">
        <LevelTwoRouterConfig path="/personal"></LevelTwoRouterConfig>
      </div>
    </div>
  );
};

export default Personal;
