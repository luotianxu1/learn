import React from 'react'

class Demo extends React.Component {
    state = {
        x: 10,
        y: 5,
        z: 0,
    }

    handle = () => {
        let { x, y, z } = this.state
        this.setState(
            {
                x: x + 1,
            },
            // 发生在componentDidUpdate后
            // 即便在shouldComponentUpdate阻止了状态/视图的更新，DidUpdate不会执行，但这个callback会执行
            () => {
                console.log('setState 完成')
            }
        )
        this.setState({
            y: y + 1,
        })
        this.setState({
            z: z + 1,
        })

        setTimeout(() => {
            this.setState({
                z: z + 1,
            })
            console.log(this.state)
        }, 1000)
    }

    render() {
        console.log('视图渲染')
        let { x, y, z } = this.state
        return (
            <div>
                x:{x} - y:{y} - z:{z}
                <br />
                <button onClick={this.handle}>按钮</button>
            </div>
        )
    }

    shouldComponentUpdate() {
        return true
    }

    componentDidUpdate() {
        console.log('componentDidUpdate')
    }
}

export default Demo
