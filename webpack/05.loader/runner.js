const { runLoaders } = require('loader-runner')
const path = require('path')
const fs = require('fs')
const entryFile = path.resolve(__dirname, 'src/index.js')
const request = `inline1-loader!inline2-loader!${entryFile}`
let rules = [
    {
        test: /\.js$/,
        use: ['normal1-loader', 'normal2-loader'],
    },
    {
        test: /\.js$/,
        enforce: 'pre', //是不是pre跟loader本身没有关系，跟你写在配置文件里的时候，enforce的值有关系
        use: ['pre1-loader', 'pre2-loader'],
    },
    {
        test: /\.js$/,
        enforce: 'post',
        use: ['post1-loader', 'post2-loader'],
    },
]
let parts = request.replace(/^-?!+/, '').split('!')
let resource = parts.pop() //${entryFile}
let inlineLoaders = parts //[`inline1-loader,inline2-loader]
//loader 的叠加顺序 = post(后置)+inline(内联)+normal(正常)+pre(前置)
let preLoaders = [],
    postLoaders = [],
    normalLoaders = []
for (let i = 0; i < rules.length; i++) {
    let rule = rules[i]
    if (rule.test.test(resource)) {
        if (rule.enforce === 'post') {
            postLoaders.push(...rule.use)
        } else if (rule.enforce === 'pre') {
            preLoaders.push(...rule.use)
        } else {
            normalLoaders.push(...rule.use)
        }
    }
}
let loaders = []
//loader的执行顺序是在这定义，是在执行runLoaders之前就确定好的
//noPrePostAutoLoaders	不要前后置和普通 loader,只要内联 loader
if (request.startsWith('!!')) {
    loaders.push(...inlineLoaders)
    //noPreAutoLoaders	不要前置和普通 loader
} else if (request.startsWith('-!')) {
    loaders.push(...postLoaders, ...inlineLoaders)
    //noAutoLoaders	不要普通 loader
} else if (request.startsWith('!')) {
    loaders.push(...postLoaders, ...inlineLoaders, ...preLoaders)
} else {
    //这里的前置 和后置是相对于normal来说的。
    loaders.push(
        ...postLoaders,
        ...inlineLoaders,
        ...normalLoaders,
        ...preLoaders
    )
}
loaders = loaders.map((loader) => path.resolve(__dirname, 'loaders', loader))

runLoaders(
    {
        resource,
        loaders,
        context: { age: 15 },
    },
    (err, result) => {
        console.log(result)
    }
)
