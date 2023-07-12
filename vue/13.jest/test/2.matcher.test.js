describe('查看常见的匹配器', function () {
    it('相等条件', () => {
        expect(1 + 1).toBe(2) // ===
        expect({}).toEqual({}) // 比较值是否相等
        expect(null).toBeNull()
        expect('ok').toBeTruthy() // 如果这个值寸杂就是真的
    })

    it.only('不相等关系', () => {
        expect(1 + 1).not.toBe(3)
        expect(1 + 1).toBeLessThan(3) // !=
        expect(1 + 1).toBeGreaterThan(1) // <
        expect(1 + 1).toBeGreaterThanOrEqual(1) // 不相等 >=
    })

    it('判断包含关系', () => {
        expect('zfpx').toContain('zf')
        expect('zfpx').toMatch('zf')
        expect('zfpx').toMatch(/zf/)
    })
})

// jest可以进行配置，
