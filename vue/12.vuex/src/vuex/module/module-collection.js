import { forEachVal } from '../utils'
import Module from './module'

class ModuleCollection {
    constructor(options) {
        this.register([], options) // 栈 stack[根对象，a,c]
    }

    register(path, rootModule) {
        let newModule = new Module(rootModule)
        if (path.length == 0) {
            // 根模块
            this.root = newModule
        } else {
            // [a]
            // [b]
            let parent = path.slice(0, -1).reduce((memo, current) => {
                return memo.getChild(current)
            }, this.root)
            parent.addChild(path[path.length - 1], newModule)
        }
        if (rootModule.modules) {
            forEachVal(rootModule.modules, (module, moduleName) => {
                this.register(path.concat(moduleName), module)
            })
        }
    }
}

export default ModuleCollection

/**
 * this.toot = {
 *  _row: '跟模块',
 *  _children:{
 *      a: {
 *          _row: 'a模块',
 *          _children: {
 *              c: {
 *                   _row: 'c模块',
 *                   _children: {},
 *                   state: ''
 *              }
 *          },
 *          state: ''
 *      }
 *      b: {
 *          _row: 'b模块',
 *          _children: {},
 *          state: ''
 *      }
 *  },
 *  state: ''
 * }
 */
