const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    devtool: 'source-map', //生成的包后文件到源码的映射
    entry: './src/index.js',
    context: process.cwd().replace(/\\/g, '/'),
    output: {
        path: path.resolve('dist'),
        filename: 'main.js',
    },
    resolveLoader: {
        // alias: {
        //     'babel-loader': path.resolve(__dirname, 'babel-loader.js'),
        // },
        modules: ['my-loaders', 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
}
