// 默认jest会查找当前目录下以test.js结尾的文件进行测试
import { parser, stringify } from '../1.qs'

// 分类 如果不写默认相当于都在对外称使用这个describe
describe('测试qs库是否符合规范', function () {
    it('测试parser是否合法', () => {
        expect(parser(`a=1&b=2`)).toEqual({ a: 1, b: 2 })
    })

    it('测试stringify是否合法', () => {
        expect(stringify({ a: 1, b: 2 })).toBe('a=1&b=2')
    })
})
