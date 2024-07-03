import { root, useEffect, useState } from './React'

function App() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log('useEffect')
    }, [])

    return (
        <>
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setCount(count - 1)}>-1</button>
        </>
    )
}

root.render(<App />)

export default App
