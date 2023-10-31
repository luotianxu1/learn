const { SyncHook } = require('tapable')
const path = require('path')
const fs = require('fs')
const Compilation = require('./Compilation')

class Compiler {
    constructor(options) {
        this.options = options
        this.hooks = {
            run: new SyncHook(), // 会在编译开始的时候触发次钩子
            done: new SyncHook(), // 会在编译结束的时候触发次钩子
        }
    }
    //4、执行`Compiler`对象的`run`方法开始执行编译
    run(callback) {
        // 在编译前触发run钩子执行，表示开始启动编译了
        this.hooks.run.call()
        const onCompiled = (err, stats, fileDependencies) => {
            //10.在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
            for (const filename in stats.assets) {
                let filePath = path.join(this.options.output.path, filename)
                fs.writeFileSync(filePath, stats.assets[filename], 'utf8')
            }
            callback(err, {
                toJson: () => stats,
            })
            //会遍历依赖的文件，对这些文件进行监听，当这些文件发生变化后会重新开始一次新的编译
            ;[...fileDependencies].forEach((fileDependency) => {
                fs.watch(fileDependency, () => this.compile(onCompiled))
            })
            this.hooks.done.call()
        }
        //调用this.compile方法开始真正的编译 ，编译 成功后会执行onCompiled回调
        this.compile(onCompiled)
    }
    compile(callback) {
        //每次调用compile方法，都会创建一个新的Compilation
        const compilation = new Compilation(this.options)
        //调用compilation的build方法开始编译
        compilation.build(callback)
    }
}
module.exports = Compiler
