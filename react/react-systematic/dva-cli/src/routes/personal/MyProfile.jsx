import React from "react";
import { withRouter } from "dva/router";

const MyProfile = function MyProfile(props) {
  console.log(props.location);
  console.log(props.match);
  /**
   * location对象
   *  + search 获取问号传参信息 -> '?xxx=xxx'
   *  + state 获取隐式传递的信息
   *  + pathname 目标的路由地址
   */
  return <div>我的信息</div>;
};

export default withRouter(MyProfile);
