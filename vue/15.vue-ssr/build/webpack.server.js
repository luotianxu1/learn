const base = require('./webpack.base')
const { merge } = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const resolve = (dir) => {
    return path.resolve(__dirname, dir)
}

module.exports = merge(base, {
    entry: {
        server: resolve('../src/server-entry.js'),
    },
    target: 'node',
    output: {
        libraryTarget: 'commonjs2', // 指定导出方式
    },
    plugins: [
        new VueSSRServerPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.ssr.html',
            template: resolve('../public/index.ssr.html'),
            minify: false,
            excludeChunks: ['server'], // 排除打包文件
        }),
    ],
})
