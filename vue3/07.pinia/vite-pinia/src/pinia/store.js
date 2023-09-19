import {
    computed,
    effectScope,
    getCurrentInstance,
    inject,
    isRef,
    reactive,
    toRefs,
    watch,
    isReactive,
    isReadonly,
} from 'vue'
import { symbolPinia } from './consts'
import { addSubscription, triggerSubscriptions } from './subcriptions'
// let pinia = inject(symbolPinia)
// state管理store中的state
// _s store和对应的id的映射表
// _e 用于停止effect的

function isObject(value) {
    return typeof value == 'object' && value != null
}

function merge(target, state) {
    for (let key in state) {
        let oldValue = target[key]
        let newValue = state[key]
        if (isObject(oldValue) && isObject(newValue)) {
            target[key] = merge(oldValue, newValue)
        } else {
            target[key] = newValue
        }
    }
    return target
}
function createSetupStore(id, setup, pinia) {
    console.log(id)
    let scope
    // 全局可以关比所有的store，让他停止,自己也有一个scope可以停止自己
    const setupStore = pinia._e.run(() => {
        scope = effectScope() // 可以收集effect函数
        return scope.run(() => setup())
    })

    function $patch(partialStateOrMutator) {
        if (typeof partialStateOrMutator === 'function') {
            partialStateOrMutator(pinia.state.value[id])
        } else {
            merge(pinia.state.value[id], partialStateOrMutator)
        }
    }
    let actionSubscriptions = []
    const store = reactive({
        $patch,
        $dispose() {
            scope.stop()
            actionSubscriptions = []
            pinia._s.delete(id)
        },
        // 绑定数组和用户的回掉
        $onAction: addSubscription.bind(null, actionSubscriptions),
        $subscribe(callback, options = {}) {
            scope.run(() => {
                watch(
                    pinia.state.value[id],
                    (state) => {
                        callback(state)
                    },
                    options
                )
            })
        },
    }) // 这里可以扩展自己的方法
    pinia._s.set(id, store) // 放到全局的_s
    function wrapAction(action) {
        return function (...args) {
            // todo...
            let afterList = []
            let errorList = []
            function after(callback) {
                afterList.push(callback)
            }
            function onError(callback) {
                errorList.push(callback)
            }
            triggerSubscriptions(actionSubscriptions, { after, onError })
            let result
            try {
                result = action.call(store, ...args)
            } catch (e) {
                triggerSubscriptions(errorList, e)
            }
            if (result instanceof Promise) {
                return result
                    .then((v) => {
                        triggerSubscriptions(afterList, v)
                    })
                    .catch((e) => {
                        triggerSubscriptions(errorList, e)
                        return Promise.reject(e)
                    })
            }
            // action 能同步 也能异步
            return result
        }
    }
    const state = {}
    for (let key in setupStore) {
        // 这个地方会触发计算属性取值
        const v = setupStore[key]

        if ((isRef(v) || isReactive(v)) && !isReadonly(v)) {
            state[key] = v
        }
        if (typeof v === 'function') {
            setupStore[key] = wrapAction(v)
        }
    }
    Object.assign(store, setupStore) // 这个地方会触发计算属性取值

    if (!pinia.state.value[id]) {
        pinia.state.value[id] = state // compostionApi 必须有空值
    }

    // 就是一个代理
    Object.defineProperty(store, '$state', {
        get: () => pinia.state.value[id],
        set: (state) => $patch(($state) => Object.assign($state, state)),
    })
    // $state
    // if(!store.$state){
    //     pinia.state.value[id] = setupStore
    // }
    store.id = id
    pinia._p.forEach((plugin) => {
        scope.run(() => plugin(store))
    })

    return store
}
function createOptionsStore(id, options, pinia) {
    const { state, actions, getters } = options
    function setup() {
        pinia.state.value[id] = state ? state() : {}
        const localState = toRefs(pinia.state.value[id])
        // 后续还有考虑计算属性 effect
        return Object.assign(
            localState,
            actions,
            Object.keys(getters || {}).reduce((memo, key) => {
                memo[key] = computed(() => {
                    const store = pinia._s.get(id)
                    return getters[key].call(store, store)
                })
                return memo
            }, {})
        )
    }
    const store = createSetupStore(id, setup, pinia)
    // 此方法只能用在optionsApi
    store.$reset = function () {
        const newState = state ? state() : {}
        store.$patch((state) => {
            Object.assign(state, newState)
        })
    }
}
export function defineStore(idOrOptions, setup) {
    // id + 对象的格式   / id + setup
    // 对象
    let id
    let options
    if (typeof idOrOptions === 'string') {
        id = idOrOptions
        options = setup
    } else {
        id = idOrOptions.id
        options = idOrOptions
    }
    const isSetupStore = typeof setup === 'function'
    // 用户使用的函数
    function useStore() {
        const currentInstance = getCurrentInstance()
        const pinia = currentInstance && inject(symbolPinia)

        // 用户多次调用useStore方法，只有第一次是将这个store创建出来

        if (!pinia._s.has(id)) {
            if (isSetupStore) {
                createSetupStore(id, setup, pinia)
            } else {
                // 将标识和选项 放到pinia中
                createOptionsStore(id, options, pinia)
            }
        }
        const store = pinia._s.get(id) // 从全局的_s拿到的
        // 后续都是可以复用的
        return store
    }
    return useStore
}
