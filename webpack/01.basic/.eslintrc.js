module.exports = {
    // root: true,
    // 解析器，支持es6
    parser: 'babel-eslint',
    extends: 'airbnb',
    // 解析器选项 模块 es6
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: '2015',
    },
    // 指定脚本的运行环境 是在浏览器里
    env: {
        browser: true,
        node: true,
    },
    rules: {
        indent: 'off',
        quotes: 'off',
        'no-console': 'off',
        'no-param-reassign': 'off',
        semi: 'off',
    },
}
