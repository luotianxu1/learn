const args = require('minimist')(process.argv.slice(2))
const { build } = require('esbuild')
const { resolve } = require('path')

const target = args._[0] || 'reactivity'

const format = args.f || 'global'

const entry = resolve(__dirname, `../packages/${target}/src/index.ts`)

const globalName = require(resolve(
    __dirname,
    `../packages/${target}/package.json`
)).buildOptions?.name

const outputFormat = format.startsWith('global')
    ? 'iife'
    : format === 'cjs'
    ? 'cjs'
    : 'esm'

const outfile = resolve(
    __dirname,
    `../packages/${target}/dist/${target}.${format}.js`
)

build({
    // 打包的入口
    entryPoints: [entry],
    outfile,
    bundle: true, // 将依赖的模块全部打包
    sourcemap: true, // 支持调试
    format: outputFormat, // 打包出来的模块是esm  es6模块
    globalName: globalName,
    platform: format === 'cjs' ? 'node' : 'browser', // 打包的结果给浏览器来使用
    watch: {
        onRebuild() {
            // 文件变化后重新构建
            console.log('rebuild~~~')
        },
    },
}).then(() => {
    console.log('watching~~~')
})
