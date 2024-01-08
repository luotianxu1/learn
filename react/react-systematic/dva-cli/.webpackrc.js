import px2rem from "postcss-pxtorem";

export default {
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
};
