const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: false,
    entry: './src/index.js',
    //   entry: {
    //     entry1: './src/entry1.js',
    //     entry2: './src/entry2.js',
    //   },
    output: {
        // publicPath:'/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
    ],
}
