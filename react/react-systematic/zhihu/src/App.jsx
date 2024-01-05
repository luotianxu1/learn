import React from 'react'
import { HashRouter } from 'react-router-dom'
import RouterView from './router'
import { KeepAliveProvider } from 'keepalive-react-component'

const App = function App() {
    return (
        <HashRouter>
            <KeepAliveProvider>
                <RouterView></RouterView>
            </KeepAliveProvider>
        </HashRouter>
    )
}

export default App
