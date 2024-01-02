import React from 'react'
import { HashRouter } from 'react-router-dom'
import RouterView from './router'

const App = function App() {
    return (
        <HashRouter>
            <RouterView></RouterView>
        </HashRouter>
    )
}

export default App
