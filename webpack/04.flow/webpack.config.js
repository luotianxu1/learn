const path = require('path')
const DonePlugin = require('./plugins/done-plugin')

module.exports = {
    mode: 'production',

    entry: {
        entry1: './src/entry1.js',
        entry2: './src/entry2.js',
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    path.resolve(__dirname, 'loaders/logger1-loader.js'),
                    path.resolve(__dirname, 'loaders/logger2-loader.js'),
                ],
            },
        ],
    },
    plugins: [
        new DonePlugin({ msg: '消息' }), //在编译 结束的时候运行done插件
    ],
}
