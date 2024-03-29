import dynamic from "dva/dynamic";
import Vote from "./routes/Vote";

const lazy = function lazy(component, models) {
  if (typeof models === "undefined") models = () => [];
  return dynamic({
    app: window.app,
    models,
    component,
  });
};

const routes = [
  {
    path: "/",
    exact: true,
    component: Vote,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/demo",
    component: lazy(
      () => import(/* webpackChunkName:"demo" */ "./routes/Demo"),
      () => [import(/* webpackChunkName:"demo" */ "./models/demo")]
    ),
    meta: {
      title: "测试",
    },
  },
  {
    path: "/personal",
    component: lazy(() =>
      import(/* webpackChunkName:"personal" */ "./routes/Personal")
    ),
    meta: {
      title: "个人中心",
    },
    children: [
      {
        path: "/personal",
        exact: true,
        redirect: "/personal/order",
      },
      {
        path: "/personal/order",
        component: lazy(() =>
          import(/* webpackChunkName:"personal" */ "./routes/personal/MyOrder")
        ),
        meta: {
          title: "我的订单",
        },
      },
      {
        path: "/personal/profile/:lx?/:name?",
        component: lazy(() =>
          import(
            /* webpackChunkName:"personal" */ "./routes/personal/MyProfile.jsx"
          )
        ),
        meta: {
          title: "我的信息",
        },
      },
    ],
  },
  {
    path: "*",
    redirect: "/",
  },
];

export default routes;
