import React from 'react'

class Demo extends React.Component {
    state = {}

    handle1(x, y) {
        console.log(this, x, y) // undefined
    }

    handle2(x, y, ev) {
        console.log(this, x, y, ev)
    }

    handle3 = (ev) => {
        console.log(this)
        console.log(ev)
    }

    handle4 = (x, y, ev) => {
        console.log(x, y, ev)
    }

    render() {
        /**
         * bind在react中的运用
         * + 绑定的方法是一个普通函数，需要改变函数中的this实例
         * + 想给函数传递指定的实参，可以基于bind预先处理
         */
        return (
            <div>
                <button onClick={this.handle1}>按钮1</button>
                <button onClick={this.handle2.bind(this, 10, 20)}>按钮2</button>
                <button onClick={this.handle3}>按钮3</button>
                <button onClick={this.handle4.bind(null, 10, 20)}>按钮4</button>
            </div>
        )
    }
}

export default Demo
