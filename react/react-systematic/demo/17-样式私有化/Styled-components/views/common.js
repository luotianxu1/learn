import styled from 'styled-components'

export const colorRed = '#ff4d4f'
export const colorBlue = '#1677ff'
export const titleSize = '18px'

export const CommonListBox = styled.ul`
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #999;

    li {
        line-height: 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:hover {
            color: ${colorRed};
        }
    }
`
