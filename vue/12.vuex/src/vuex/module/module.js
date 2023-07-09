import { forEachVal } from '../utils'

class Module {
    constructor(newModule) {
        this._raw = newModule
        this._children = {}
        this.state = newModule.state
    }

    getChild(key) {
        return this._children[key]
    }

    addChild(key, module) {
        this._children[key] = module
    }

    forEachMutation(fn) {
        if (this._raw.mutations) {
            forEachVal(this._raw.mutations, fn)
        }
    }

    forEachAction(fn) {
        if (this._raw.actions) {
            forEachVal(this._raw.actions, fn)
        }
    }

    forEachGetter(fn) {
        if (this._raw.getters) {
            forEachVal(this._raw.getters, fn)
        }
    }

    forEachChild(fn) {
        forEachVal(this._children, fn)
    }

    // 用于标识他自己是否写了namesapced
    get namespaced() {
        // module.namespaced
        return !!this._raw.namespaced
    }
}

export default Module
