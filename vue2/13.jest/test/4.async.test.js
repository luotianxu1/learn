import { getData, getDataPromise } from '../3.async'

jest.useFakeTimers() //创建一个模拟的timer

describe('测试异步获取数据的方法', () => {
    // it('测试get Data', (done) => {
    //     getData(function (data) {
    //         expect(data).toEqual({ name: 'jw' })
    //         done()
    //     })
    // })

    // it('测试getDataPromise', (done) => {
    //     getDataPromise().then((data) => {
    //         expect(data).toEqual({ name: 'jw' })
    //         done()
    //     })
    // })

    it.only('测试get Data', () => {
        getData(function (data) {
            expect(data).toEqual({ name: 'jw' })
        })
        jest.runOnlyPendingTimers()
    })

    // promise可以采用done的方式也可以采用async await
    it('测试getDataPromise', async () => {
        let data = await getDataPromise()
        expect(data).toEqual({ name: 'jw' })
    })
})
