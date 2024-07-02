import React from 'react'
import { Tag, Space } from 'antd'
import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { closeTab } from '../../store/reducers/tab'

const CommonTag = () => {
    const dispatch = useDispatch()
    const tabList = useSelector((state) => state.tab.tabList)
    const currentMenu = useSelector((state) => state.tab.currentMenu)
    console.log(tabList)
    console.log(currentMenu)

    const handleClose = (item, index) => {
        // dispatch(closeTab(item))
    }

    const handleChange = (tag) => {}

    const setTag = (flag, item, index) => {
        console.log(flag)
        return flag ? (
            <Tag color='#55acee' closeIcon onClose={handleClose(item, index)}>
                {item.label}
            </Tag>
        ) : (
            <Tag key={item.name} onClick={() => handleChange(item)}>
                {item.label}
            </Tag>
        )
    }

    return (
        <Space className='common-tag' size={[0, 8]} wrap>
            {currentMenu.name &&
                tabList.map((item, index) =>
                    setTag(item.path === currentMenu.path, item, index)
                )}
        </Space>
    )
}

export default CommonTag
