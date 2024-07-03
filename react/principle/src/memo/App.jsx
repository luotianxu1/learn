import { root, useState, memo } from './React'

const Child = memo((props) => {
    console.log('Child render')

    return (
        <div>
            <h1>count2:{props.count2}</h1>
        </div>
    )
})

function App() {
    const [count1, setCount1] = useState(0)
    const [count2, setCount2] = useState(0)

    return (
        <>
            <h1>count1:{count1}</h1>
            <button onClick={() => setCount1(count1 + 1)}>+1</button>
            <Child count2={count2}></Child>
            <button onClick={() => setCount2(count2 - 1)}>-1</button>
        </>
    )
}

root.render(<App />)

export default App
