/**
 * @jest-environment jsdom
 */

import { removeNode } from '../2.dom'

describe('测试dom', () => {
    it('测试节点能否被删除', () => {
        // jest js-dom可以在node环境下模拟一套dom结构

        // 1、先创建一个节点 扔到页面中，调用删除方法 再去看一下这个节点是否消失了
        let div = document.createElement('div')
        div.id = 'oDiv'
        document.body.appendChild(div)
        let ele = document.getElementById('oDiv')

        expect(ele).not.toBeNull()

        removeNode(ele)

        ele = document.getElementById('oDiv')
        expect(ele).toBeNull()
    })
})
