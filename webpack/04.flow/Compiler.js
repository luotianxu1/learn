const { SyncHook } = require('tapable')
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
    run() {
        // 在编译前触发run钩子执行，表示开始启动编译了
        this.hooks.run.call()
        const onCompiled = (err, stats, fileDependencies) => {
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
