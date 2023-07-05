export default function applyMixin(Vue) {
    Vue.mixin({
        beforeCreate: vuexinit,
    })
}

function vuexinit() {
    const options = this.$options // 获取用户的所有选项
    if (options.store) {
        // 根实例
        this.$store = options.store
    } else if (options.parent && options.parent.$store) {
        // 儿子或者孙子
        this.$store = options.parent.$store
    }
}
