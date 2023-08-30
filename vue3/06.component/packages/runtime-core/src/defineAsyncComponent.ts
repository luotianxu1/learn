import { ref } from '@vue/reactivity'
import { Fragment } from './createVNode'
import { h } from './h'

export function defineAsyncComponent(loaderOPtions) {
    if (typeof loaderOPtions == 'function') {
        loaderOPtions = {
            loader: loaderOPtions,
        }
    }

    let Component = null
    return {
        setup() {
            const {
                loader,
                timeout,
                errorComponent,
                delay,
                loadingComponent,
                onError,
            } = loaderOPtions

            const loaded = ref(false)
            const error = ref(false)
            const loading = ref(false)

            if (timeout) {
                setTimeout(() => {
                    error.value = true
                }, timeout)
            }

            if (delay) {
                setTimeout(() => {
                    loading.value = true
                }, timeout)
            } else {
                loading.value = true
            }

            function load() {
                return loader().catch((err) => {
                    if (onError) {
                        return new Promise((resolve, reject) => {
                            const retry = () => resolve(load())
                            const fail = (err) => {
                                reject(err)
                            }
                            onError(err, retry, fail, ++attempts)
                        })
                    }
                })
            }
            let attempts = 0

            load()
                .then((v) => {
                    loaded.value = true
                    Component = v
                })
                .catch((err) => {
                    error.value = true
                })
                .finally(() => {
                    loading.value = false
                })

            return () => {
                if (loaded.value) {
                    return h(Component)
                } else if (error.value && errorComponent) {
                    // 错误
                    return h(errorComponent)
                } else if (loading.value && loadingComponent) {
                    // loading
                    return h(loadingComponent)
                } else {
                    // 空
                    return h(Fragment, [])
                }
            }
        },
    }
}
