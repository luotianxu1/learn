const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const resolve = (dir) => {
    return path.resolve(__dirname, dir)
}

module.exports = {
    entry: resolve('./src/app.js'),
    output: {
        filename: 'bundle.js',
        path: resolve('dist'),
    },
    module: {
        // resolve: {
        //     extensions: ['.js', '.vue', 'css', 'jsx'],
        // },
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader'],
            },
            {
                test: /\.js$/,
                use: {
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                    loader: 'babel-loader',
                },
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: resolve('./public/index.html'),
        }),
    ],
}
