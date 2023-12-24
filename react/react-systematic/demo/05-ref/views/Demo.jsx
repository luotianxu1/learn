import React from 'react'

class Demo extends React.Component {
    box3 = React.createRef()
    render() {
        return (
            <div>
                <h2 className='title' ref='titleBox'>
                    温馨提示
                </h2>
                <h2 className='title' ref={(x) => (this.box2 = x)}>
                    友情提示
                </h2>
                <h2 className='title' ref={this.box3}>
                    郑重提示
                </h2>
            </div>
        )
    }

    componentDidMount() {
        console.log(this.refs.titleBox) // 严格模式下报错
        console.log(this.box2)
        console.log(this.box3.current)
    }
}

export default Demo
