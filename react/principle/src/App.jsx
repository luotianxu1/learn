import { root, useState, memo, useMemo, useCallback } from './React'

const Child = memo((props) => {
    console.log('Child render')

    return (
        <div>
            <h1>count2:{props.childData.count2}</h1>
            <button onClick={props.setCount2}>-1</button>
        </div>
    )
})

function App() {
    const [count1, setCount1] = useState(0)
    const [count2, setCount2] = useState(0)

    const cbSetCount2 = useCallback(() => {
        setCount2((count2) => count2 - 1)
    }, [])

    const childData = useMemo(() => ({ count2 }), [count2])

    return (
        <>
            <h1>count1:{count1}</h1>
            <button onClick={() => setCount1(count1 + 1)}>+1</button>
            <Child childData={childData} setCount2={cbSetCount2}></Child>
        </>
    )
}

root.render(<App />)

export default App
