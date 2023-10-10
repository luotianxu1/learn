const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

console.log('webpack.config', process.env.NODE_ENV)

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'main.js',
    },
    resolve: {
        alias: {
            '@': path.resolve('src'),
        },
    },
    devServer: {
        static: path.resolve(__dirname, 'public'),
        port: 8080,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader', // 会返回一段脚本，此脚本会动态创建style标签，并且把内容设置为css-loader传递过来的字符串
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            modules: false,
                            esModule: true,
                            importLoaders: 2,
                        },
                    }, // 会读取css文件，并且自动识别里面important的文件
                    'postcss-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader', // 会返回一段脚本，此脚本会动态创建style标签，并且把内容设置为css-loader传递过来的字符串
                    'css-loader',
                    'less-loader', // 会读取源CSS文件，并且自动可以识别里面import语句并把对应CSS内容合并过来
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // 会返回一段脚本，此脚本会动态创建style标签，并且把内容设置为css-loader传递过来的字符串
                    'css-loader',
                    'sass-loader', // 会读取源CSS文件，并且自动可以识别里面import语句并把对应CSS内容合并过来
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV2': "'development'",
        }),
    ],
}
// module.exports = (env, argv) => {
//     console.log(env)
//     return {
//         mode: env.development ? 'development' : 'production',
//         entry: './src/index.js',
//         output: {
//             path: path.resolve('dist'),
//             filename: 'main.js',
//         },
//         module: {
//             rules: [
//                 {
//                     test: /\.css$/,
//                     use: ['style-loader', 'css-loader'],
//                 },
//             ],
//         },
//         plugins: [
//             new HtmlWebpackPlugin({
//                 template: './src/index.html',
//                 filename: 'index.html',
//             }),
//         ],
//     }
// }
