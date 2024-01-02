import React from 'react'
import { HashRouter } from 'react-router-dom'
import HomeHead from './components/HomeHead'
import RouterView from './router'

const App = function App() {
    return (
        <HashRouter>
            <HomeHead></HomeHead>

            <div className='content'>
                {/*
                所有路由匹配规则，放在<Routes>中
                每一条规则的匹配，还是基于<Route>
                    + 路由匹配成功，不再基于component/render控制渲染的组件，而是基于element，语法格式是<Component/>
                    + 不再需要Switch，默认就是一个匹配成功，就不再匹配下面的了
                    + 不再需要exact，默认每一项匹配都是精准匹配
                原有的<Redirect>被<Navigate to='/'/>代替
                    + 遇到<Navigate/>组件，路由就会跳转，跳转到to指定的路由地址
                    + 设置 replace属性，则不会新增路由记录，而是替换现有记录
                    + <navigate to={{...}}/>to的值可以是一个对象，pathname需要跳转的地址、search问号传参信息
                */}

                {/* <Routes>
                    <Route
                        path='/'
                        element={<Navigate to='/a/a1'></Navigate>}
                    ></Route>
                    <Route path='/a' element={<A />}>
                        <Route path='/a/a1' element={<A1></A1>}></Route>
                        <Route path='/a/a2' element={<A2></A2>}></Route>
                        <Route path='/a/a3' element={<A3></A3>}></Route>
                    </Route>
                    <Route path='/b' element={<B />}></Route>
                    <Route path='/c/:id?/:name?' element={<C />}></Route>
                    <Route
                        path='*'
                        element={
                            <Navigate
                                to={{
                                    pathname: '/a',
                                    search: '?a=100',
                                }}
                            ></Navigate>
                        }
                    ></Route>
                </Routes> */}
                <RouterView></RouterView>
            </div>
        </HashRouter>
    )
}

export default App
