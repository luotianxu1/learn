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
        onBeforeSetupMiddleware({ app }) {
            app.get('/api/users', (req, res) => {
                res.json({
                    success: true,
                    data: [
                        { id: 1, name: 'zhufeng1' },
                        { id: 2, name: 'zhufeng2' },
                        { id: 3, name: 'zhufeng3' },
                    ],
                })
            })
        },
        // proxy: {
        //     target: 'http://localhost:3000',
        // },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre', // 默认 pre前置  post 后置
                options: { fix: true },
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                            ],
                            plugins: [
                                [
                                    '@babel/plugin-proposal-decorators',
                                    { legacy: true },
                                ],
                                [
                                    '@babel/plugin-proposal-class-properties',
                                    { loose: true },
                                ],
                            ],
                        },
                    },
                ],
            },
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
                    path.resolve(__dirname, 'loaders/logger1.js'),
                    path.resolve(__dirname, 'loaders/logger2.js'),
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
            {
                test: /\.png$/,
                type: 'asset/resource', // 这是webpack5的新功能，file-loader
            },
            {
                test: /\.ico$/,
                type: 'asset/inline', // 这是webpack5的新功能，url-loader 把文件内容变成base64字符串返回
            },
            {
                test: /\.txt$/,
                type: 'asset/source', // 这是webpack5的新功能，raw-loader 读取文件的原始内容
            },
            {
                test: /\.jpg$/,
                type: 'asset', // 如果只写asset,不写/inline /resource 会自动根据文件大小进行选择处理
                parser: {
                    // 如果文件大于4K的话，就产出生成一个新的文件，并返回新的文件路径，如果小于4K的话返回内容的base64字符串
                    dataUrlCondition: {
                        maxSize: 4 * 1024,
                    },
                },
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
