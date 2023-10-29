const Compiler = require('./Compiler')

function webpack(options) {
    //1.初始化参数：从配置文件和 Shell 语句中读取并合并参数,得出最终的配置对象
    const argv = process.argv.slice(2)
    let shellOptions = argv.reduce((shellOptions, option) => {
        let [key, value] = option.split('=')
        shellOptions[key.slice(2)] = value
        return shellOptions
    }, {})
    const finalOptions = { ...options, ...shellOptions }
    //2.用上一步得到的参数初始化 Compiler 对象
    const compiler = new Compiler(finalOptions)
    //3. 加载所有配置的插件
    const { plugins = [] } = finalOptions
    for (const plugin of plugins) {
        plugin.apply(compiler)
    }
    return compiler
}

module.exports = webpack
