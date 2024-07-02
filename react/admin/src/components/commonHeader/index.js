import React from 'react'
import { MenuFoldOutlined } from '@ant-design/icons'
import { Button, Layout, Avatar, Dropdown } from 'antd'
import './index.css'
import { useDispatch } from 'react-redux'
import { collapseMenu } from '../../store/reducers/tab'

const { Header } = Layout

const CommonHeader = ({ collapsed }) => {
    const logout = () => {}

    const items = [
        {
            key: '1',
            label: (
                <a target='_blank' rel='npppener noreferrer'>
                    个人中心
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a
                    onClick={() => logout}
                    target='_blank'
                    rel='npppener noreferrer'
                >
                    退出
                </a>
            ),
        },
    ]

    const dispatch = useDispatch()
    const setCollapsed = () => {
        dispatch(collapseMenu())
    }

    return (
        <Header className='header-container'>
            <Button
                type='text'
                icon={<MenuFoldOutlined />}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 32,
                    backgroundColor: '#fff',
                }}
                onClick={() => setCollapsed()}
            />
            <Dropdown menu={{ items }}>
                <Avatar
                    size={36}
                    src='https://api.dicebear.com/7.x/miniavs/svg?seed=1'
                ></Avatar>
            </Dropdown>
        </Header>
    )
}

export default CommonHeader
