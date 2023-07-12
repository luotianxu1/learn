jest.mock('../__mocks/4.ajax.js')
import { getList, getData, getUrl } from '../4.ajax'

describe('测试能否这个奶茶给你获取数据', () => {
    it('测试getList', async () => {
        let list = await getList()
        expect(list).toEqual([1, 2, 3, 4])
    })
})
