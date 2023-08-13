export function getSequence(arr) {
    let len = arr.length
    const p = arr.slice(0).fill(-1) // 用来存储标记的索引， 内容无所谓主要是和数组的长度一致
    let result = [0]
    let lastIndex
    let start
    let end
    let middle

    for (let i = 0; i < len; i++) {
        const arrI = arr[i]
        if (arrI !== 0) {
            // 0在vue3中意味着新增节点，不计入最长递增子序列列表
            lastIndex = result[result.length - 1] // 去到数组中的最后一项，就是最大的那个索引
            if (arr[lastIndex] < arrI) {
                // 说明当前这一项比结果集中最后一项大，直接将索引放入即可
                result.push(i)
                p[i] = lastIndex // 记录上一次最后一个人的索引
                continue
            }

            start = 0
            end = result.length - 1
            while (start < end) {
                middle = Math.floor((start + end) / 2)
                if (arr[result[middle]] < arrI) {
                    start = middle + 1
                } else {
                    end = middle
                }
            }

            if (arrI < arr[result[end]]) {
                p[i] = result[end - 1] // 记录前一个人的索引
                result[end] = i
            }
        }
    }

    // 实现倒序追踪
    let i = result.length // 总长度
    let last = result[i - 1] // 获取最后一项
    while (i-- > 0) {
        result[i] = last // 最后一项是正确
        last = p[last] // 通过最后一项找到对应的结果，将他作为最后一项来进行追踪
    }

    return result
}

// let arrIndex = getSequence([2, 3, 1, 5, 6, 8, 7, 9, 4])
