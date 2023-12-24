import React from 'react'

class Child1 extends React.Component {
    render() {
        return <div ref={(x) => (this.box = x)}>子组件1</div>
    }
}

const Child2 = React.forwardRef(function Child2(props, ref) {
    console.log(ref)
    return <div ref={ref}>子组件2</div>
})

class Demo2 extends React.Component {
    box3 = React.createRef()
    render() {
        return (
            <div>
                <Child1 ref={(x) => (this.child1 = x)}></Child1>
                <Child2 ref={(x) => (this.child2 = x)}></Child2>
            </div>
        )
    }

    componentDidMount() {
        console.log(this.child1) // 子组件的实例
        console.log(this.child2) // 子组件的内部的元素
        console.log(this.child1.box)
    }
}

export default Demo2
