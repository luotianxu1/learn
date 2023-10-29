// const { SyncHook } = require('tapable')

class SyncHook {
    constructor(args) {
        this.args = args || []
        this.taps = []
    }
    tap(name, fn) {
        this.taps.push({ name, fn })
    }
    call() {
        const args = Array.prototype.slice.call(arguments, 0, this.args.length)
        this.taps.forEach((tap) => tap.fn(...args))
    }
}

let syncHook = new SyncHook(['name'])

syncHook.tap('监听器1', (name) => {
    console.log(name)
})

syncHook.tap('监听器2', (name) => {
    console.log(name)
})

class SomePlugin {
    apply() {
        syncHook.tap('SomePlugin', (name) => {
            console.log('SomePlugin', name)
        })
    }
}
new SomePlugin().apply()
syncHook.call('名称')
