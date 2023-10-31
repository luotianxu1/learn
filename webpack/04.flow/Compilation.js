const path = require('path')
const fs = require('fs')
const parser = require('@babel/parser')
const types = require('babel-types')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default

function normalizePath(path) {
    return path.replace(/\\/g, '/') //统一成linux的路径分隔符
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
            this.modules.push(entryModule)
            // 8、等把所有的模块编译完成后，根据模块之间的依赖关系，组装成一个个包含多个模块的chunk
            let chunk = {
                name: entryName, //代码块的名称就是入口的名称
                entryModule, //入口的模块
                modules: this.modules.filter((module) =>
                    module.names.includes(entryName)
                ),
            }
            this.chunks.push(chunk)
        }
        //9.再把每个 Chunk 转换成一个单独的文件加入到输出列表
        this.chunks.forEach((chunk) => {
            const filename = this.options.output.filename.replace(
                '[name]',
                chunk.name
            )
            this.assets[filename] = getSource(chunk)
        })
        callback(
            null,
            {
                chunks: this.chunks,
                module: this.modules,
                assets: this.assets,
            },
            this.fileDependencies
        )
    }
    // 编译模块时，需要传递
    buildModule = (name, modulePath) => {
        // 6.1、读取模块的源代码
        const sourceCode = fs.readFileSync(modulePath, 'utf8')
        // buildModule返回一个模块对象，每个模块都会有一个模块id，等于相对于根目录的相对路径
        const moduleId = './' + path.posix.relative(baseDir, modulePath)
        // 创建一个模块对象name是此模块属于哪个代码块
        let module = { id: moduleId, names: [name], dependencies: [] }
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
        // 7、再找出此模块的依赖的模块，再递归本步骤找到依赖的模块进行编译
        let ast = parser.parse(sourceCode, { sourceType: 'module' })
        traverse(ast, {
            CallExpression: (nodePath) => {
                const { node } = nodePath
                // 如果这是一个require的方法调用的话
                if (node.callee.name === 'require') {
                    // 获取依赖的模块
                    let depModuleName = node.arguments[0].value
                    // 当前的正在编译的模块目录
                    let dirname = path.posix.dirname(modulePath)
                    // 获取依赖模块的绝对路径
                    const depModulePath = this.tryExtension(
                        path.posix.join(dirname, depModuleName)
                    )
                    this.fileDependencies.add(depModulePath)
                    // 获取依赖的模块id
                    let depModuleId =
                        './' + path.posix.relative(baseDir, depModulePath)
                    // 把依赖的模块改为依赖模块ID
                    node.arguments = [types.stringLiteral(depModuleId)] //./title => ./src/title.js
                    // 给当前的模块添加模块依赖
                    module.dependencies.push({ depModuleId, depModulePath })
                }
            },
        })
        // 重新生成新的代码
        let { code } = generator(ast)
        // 把转移后的源代码存放到module._source属性上
        module._source = code
        // 再递归本步骤找到依赖的模块进行编译
        module.dependencies.forEach(({ depModuleId, depModulePath }) => {
            // 先在已经编译 好的模块数组中找一找有没有这个模块
            const existModule = this.modules.find(
                (module) => module.id === depModuleId
            )
            // 如果已经编译过了，在名称数组添加当前的代码块的名字
            if (existModule) {
                existModule.names.push(name)
            } else {
                let depModule = this.buildModule(name, depModulePath)
                this.modules.push(depModule)
            }
        })
        return module
    }
    tryExtension = (modulePath) => {
        //如果文件存在，说明require模块的时候已经添加了后缀了，直接返回
        if (fs.existsSync(modulePath)) {
            return modulePath
        }
        let extensions = ['.js']
        if (this.options.resolve && this.options.resolve.extensions) {
            extensions = this.options.resolve.extensions
        }
        for (let i = 0; i < extensions.length; i++) {
            let filePath = modulePath + extensions[i]
            if (fs.existsSync(filePath)) {
                return filePath
            }
        }
        throw new Error(`${modulePath}未找到`)
    }
}
function getSource(chunk) {
    return `
      (() => {
      var modules = ({
        ${chunk.modules.map(
            (module) => `
          "${module.id}":(module,exports,require)=>{
            ${module._source}
          }
        `
        )}
      });
      var cache = {};
      function require(moduleId) {
        var cachedModule = cache[moduleId];
        if (cachedModule !== undefined) {
          return cachedModule.exports;
        }
        var module = cache[moduleId] = {
          exports: {}
        };
        modules[moduleId](module, module.exports, require);
        return module.exports;
      }
      var exports = {};
      ${chunk.entryModule._source}
      })()
      ;
    `
}
function tryExtensions(modulePath, extensions) {
    if (fs.existsSync(modulePath)) {
        return modulePath
    }
    for (let i = 0; i < extensions.length; i++) {
        let filePath = modulePath + extensions[i]
        if (fs.existsSync(filePath)) {
            return filePath
        }
    }
    throw new Error(`${modulePath}未找到`)
}
module.exports = Compilation
