import styled from 'styled-components'
import { colorBlue, colorRed, titleSize } from './common'

/**
 * 基于“styled.标签名”这种方式编写需要的样式
 *  + 样式要写在“ES6模板字符串中”
 *  + 返回并且导出的结果是一个自定义组件
 *吧
 */
export const NavBox = styled.nav`
    background-color: lightblue;
    width: 300px;

    .title {
        font-size: ${titleSize};
        color: ${colorRed};
        &:hover {
            color: ${colorBlue};
        }
    }
`

export const NavBarBox = styled.div.attrs((props) => {
    return {
        size: props.size || 16,
    }
})`
    line-height: 40px;
    a {
        font-size: ${(props) => props.size}px;
        color: #333;
        margin-right: 10px;

        &:hover {
            color: ${(props) => props.hover};
        }
    }
`
