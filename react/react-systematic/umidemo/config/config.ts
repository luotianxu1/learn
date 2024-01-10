import { defineConfig } from 'umi'
import routes from './routes'

export default defineConfig({
    // 关闭所有环境下的sourcemap
    devtool: false,
    // 打包后的文件带hash值
    hash: true,
    // 多大的图片自动base64
    inlineLimit: 1000,
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    // 设置js压缩方式
    jsMinifier: 'terser',
    // 路由
    history: {
        type: 'hash',
    },
    // 基于链式写法，修改webpack配置项
    chainWebpack(memo, { env, webpack }) {
        // memo 现有的webpack配置项
        // env 环境变量
        // webpack webpack对象
    },
    // 配合headScripts可以把项目中一些第三方模块，单独在html中进行导入
    externals: {},
    headScripts: [],
    links: [],
    metas: [],
    // 额外扩展项
    extraBabelPlugins: [],
    // 浏览器兼容
    polyfill: {},
    // 设置需要兼容的最低版本浏览器
    targets: {
        ie: 11,
    },
    // 跨域
    proxy: {
        '/api': {
            target: '',
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        },
    },
    routes: routes,
})
