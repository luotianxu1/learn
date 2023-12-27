import Nav from './views/Nav'
import Menu from './views/Menu'
import './App.less'

const App = function App() {
    return (
        <div className='home-box'>
            <Nav></Nav>
            <Menu></Menu>
            <div className='box'>我是内容 </div>
        </div>
    )
}

export default App
