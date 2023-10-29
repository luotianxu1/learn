const path = require('path')
const fs = require('fs')

function normalizePath(path) {
    return path.replace(/\\/g, '/') + '/webpack/04.flow' //统一成linux的路径分隔符
}
const baseDir = normalizePath(process.cwd())

class Compilation {
    constructor(options) {
        this.options = options
        // 本次编译所有生成出来的模块
        this.modules = []
        // 本次编译产出的所有代码块 入口模块和依赖的模块打包在一起成为代码块
        this.chunks = []
        // 本次编译产出的资源文件
        this.assets = {}
        // 本次打包涉及了哪些文件，主要是为了实现watch，监听文件的变化，文件发生变化后会重新编译
        this.fileDependencies = new Set()
    }
    build(callback) {
        // 5、根据配置文件中`entry` 配置项找到所有的入口
        let entry = {}
        if (typeof this.options.entry === 'string') {
            entry.main = this.options.entry //如果字符串，其实入口的名字叫main
        } else {
            entry = this.options.entry //否则 就是一个对象
        }
        // 6、从入口文件出发，调用所有配置的规则，比如说loader对模块进行编译
        for (let entryName in entry) {
            // 得到入口文件的绝对路径
            const entryFilePath = path.posix.join(baseDir, entry[entryName])
            console.log(entryFilePath)
            // 保存入口文件的绝对路径
            this.fileDependencies.add(entryFilePath)
            const entryModule = this.buildModule(entryName, entryFilePath)
        }
    }
    buildModule = (name, modulePath) => {
        // 6.1、读取模块的源代码
        const sourceCode = fs.readFileSync(modulePath, 'utf8')
        // 查找对应的loader对源码进行翻译和转换
        const loaders = []
        const { rules } = this.options.module
        rules.forEach((rule) => {
            const { test } = rule
            if (modulePath.match(test)) {
                loaders.push(...rule.use)
            }
        })
        // 自右向左对模块进行转译
        loaders.reduceRight((sourceCode, loader) => {
            return require(loader)(sourceCode)
        }, sourceCode)
        console.log(sourceCode)
    }
}
module.exports = Compilation
