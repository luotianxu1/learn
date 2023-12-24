import React from 'react'

class Demo extends React.Component {
    state = {
        arr: [10, 20, 30],
    }

    render() {
        let { arr } = this.state
        return (
            <div>
                {arr.map((item, index) => {
                    return (
                        <span
                            key={index}
                            style={{
                                display: 'inline-block',
                                width: 100,
                                height: 100,
                                background: 'pink',
                                marginRight: 10,
                            }}
                        >
                            {item}
                        </span>
                    )
                })}
                <br />
                <button
                    onClick={() => {
                        // 错误写法
                        // this.state.arr.push(40)
                        // this.setState({
                        //     arr: this.state.arr
                        // })

                        // 正确写法
                        this.setState({
                            arr: [...arr, 40],
                        })
                    }}
                >
                    新增span
                </button>
            </div>
        )
    }
}

export default Demo
