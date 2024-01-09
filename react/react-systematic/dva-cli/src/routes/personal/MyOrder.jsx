import React from "react";
import { Button } from "antd";
import { routerRedux } from "dva/router";
import { connect } from "dva";

/**
 * routerRedux是redux-router-redux中提供的对象，此对象中包含了路由跳转的方法
 *  + go/goBack/goFoward
 *  + push/replace
 * 相比较与props.history对象来将，routerRedux不仅可以在组件中实现路由跳转，而且可以在redux操作中实现路由的跳转
 *
 * 在redux内部
 *  yield routerRedux.push(...)
 * 在redux外部【或者组件中】
 *  dispatch(routerRedux.push(... ))
 */

const MyOrder = function MyOrder(props) {
  const { history, dispatch } = props;
  console.log(history, dispatch);
  return (
    <div>
      我的订单
      <Button
        type="primary"
        onClick={() => {
          // 问号传参：传递的信息会存在于地址栏中，即便用户刷新页面，依然可以获取相关传递的信息
          // history.push({
          //   pathname: "/personal/profile",
          //   search: "lx=0&name=test",
          // });

          // 隐式传参
          // history.push({
          //   pathname: "/personal/profile",
          //   state: {
          //     lx: 0,
          //     name: "test",
          //   },
          // });

          // 路由传参
          // history.push(`/personal/profile/0/test`);

          dispatch(
            // routerRedux.push(`/personal/profile/0/test`)
            // routerRedux.push({
            //   pathname: "/personal/profile",
            //   search: "?lx=100&name=text",
            // })
            routerRedux.push({
              pathname: "/personal/profile",
              state: { lx: 100, name: "test" },
            })
          );
        }}
      >
        按钮
      </Button>
    </div>
  );
};

export default connect()(MyOrder);
