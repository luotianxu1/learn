jest.mock('axios')
// jest.mock('../4.ajax.js')
import { getList, getData, getUrl } from '../4.ajax'

describe('测试能否正常获取数据', () => {
    it('测试getList', async () => {
        let list = await getList()
        expect(list).toEqual([1, 2, 3, 4])
    })

    it('测试getData', async () => {
        let list = await getData()
        expect(list).toEqual(['香蕉'])
    })
})
