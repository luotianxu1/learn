import React from "react";
import { NavLink } from "dva/router";

const Personal = function Personal() {
  return (
    <div>
      <div className="menu">
        <NavLink to="/personal/order">我的订单</NavLink>
        <NavLink to="/personal/order">我的信息</NavLink>
      </div>
      <div className="content"></div>
    </div>
  );
};

export default Personal;
