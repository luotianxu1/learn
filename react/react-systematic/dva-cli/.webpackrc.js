import px2rem from "postcss-pxtorem";

export default {
  // 基本配置
  hash: true,
  html: {
    template: "./public/index.ejs",
  },
  // 对css的处理
  disableCSSModules: true,
  disableCSSSourceMap: true,
  extraPostCSSPlugins: [
    px2rem({
      rootValue: 75,
      propList: ["*"],
    }),
  ],
  // 对babel扩展应用插件
  extraBabelPlugins: [
    // antd按需导入
    ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }],
    // styled-components中的px2rem
    ["styled-components-px2rem", { rootValue: 75 }],
  ],
  proxy: {
    "/api": {
      target: "",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    },
  },
  // 配置浏览器兼容列表【区分环境】
  env: {
    development: {
      extraBabelPlugins: ["dva-hmr"],
      browserslist: [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version",
      ],
    },
    production: {
      browserslist: [">0.2%", "not dead", "not op_mini all"],
    },
  },
};
