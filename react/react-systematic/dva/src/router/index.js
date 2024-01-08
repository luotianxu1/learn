import React from 'react'
import { Router, Route, Switch, Redirect } from 'dva/router'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import Vote from '../views/Vote'

function RouterConfig({ history }) {
    return (
        <ConfigProvider locale={zhCN}>
            <Router history={history}>
                <Switch>
                    <Route path='/' exact component={Vote}></Route>
                </Switch>
            </Router>
        </ConfigProvider>
    )
}

export default RouterConfig
