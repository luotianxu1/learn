import React, { useState } from 'react'
import * as Icon from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import MenuConfig from '../../config'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { selectMenuList } from '../../store/reducers/tab'

const { Sider } = Layout

const iconToElement = (name) => React.createElement(Icon[name])

const items = MenuConfig.map((icon) => {
    const child = {
        key: icon.path,
        icon: iconToElement(icon.icon),
        label: icon.label,
    }
    if (icon.children) {
        child.children = icon.children.map((item) => {
            return {
                key: item.path,
                icon: iconToElement(item.icon),
                label: item.label,
            }
        })
    }
    return child
})

const CommonAside = ({ collapsed }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const setTabsList = (val) => {
        dispatch(selectMenuList(val))
    }

    const selectMenu = (e) => {
        let data
        MenuConfig.forEach((item) => {
            console.log(item)
            if (item.path === e.keyPath[e.keyPath.length - 1]) {
                data = item
                if (e.keyPath.length > 1) {
                    item.children.find((child) => {
                        return child.path == e.key
                    })
                }
            }
        })
        setTabsList({
            path: data.path,
            name: data.name,
            label: data.label,
        })
        // 跳转路由
        navigate(e.key)
    }

    return (
        <Sider trigger={null} collapsed={collapsed}>
            <h3 className='app-name'>
                {collapsed ? '后台' : '通用后台管理系统'}
            </h3>
            <Menu
                theme='dark'
                mode='inline'
                defaultSelectedKeys={['1']}
                style={{
                    height: '100%',
                }}
                items={items}
                onClick={selectMenu}
            />
        </Sider>
    )
}

export default CommonAside
