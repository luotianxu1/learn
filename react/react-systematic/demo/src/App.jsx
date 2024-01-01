import React from 'react'
import { HashRouter } from 'react-router-dom'
import RouterView from './router'
import routes from './router/routes'
import HomeHead from './components/HomeHead'

const App = function App() {
    return (
        <HashRouter>
            <HomeHead></HomeHead>

            <div className='content'>
                <RouterView routes={routes}></RouterView>
            </div>
        </HashRouter>
    )
}

export default App
