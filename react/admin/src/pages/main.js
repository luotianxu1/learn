import { Outlet } from 'react-router-dom'
import React, { useState } from 'react'
import { Layout, theme } from 'antd'
import CommonAside from '../components/commonAside'
import CommonHeader from '../components/commonHeader'
import CommonTag from '../components/commonTag'
import { useSelector } from 'react-redux'

const { Content } = Layout

const Main = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    const collapsed = useSelector((state) => state.tab.isCollapse)
    return (
        <Layout className='main-container'>
            <CommonAside collapsed={collapsed}></CommonAside>
            <Layout>
                <CommonHeader collapsed={collapsed}></CommonHeader>
                <CommonTag></CommonTag>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet></Outlet>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Main
