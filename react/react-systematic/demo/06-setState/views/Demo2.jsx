import React from 'react'
// import { flushSync } from 'react-dom'

class Demo extends React.Component {
    state = {
        x: 0,
    }

    handle = () => {
        for (let i = 0; i < 20; i++) {
            // this.setState({
            //     x: this.state.x + 1,
            // })

            // flushSync(() => {
            //     this.setState({
            //         x: this.state.x + 1,
            //     })
            // })

            // this.setState({
            //     x: this.state.x + 1,
            // })
            // flushSync()

            this.setState((prevState) => {
                return {
                    x: prevState.x + 1,
                }
            })
        }
    }

    render() {
        console.log('视图渲染')
        let { x } = this.state
        return (
            <div>
                x:{x}
                <br />
                <button onClick={this.handle}>按钮</button>
            </div>
        )
    }
}

export default Demo
