import React from 'react'
import PropTypes from 'prop-types'

class Vote extends React.Component {
    // 属性规则校验
    static defaultProps = {
        num: 0,
    }
    static propTypes = {
        title: PropTypes.string.isRequired,
        num: PropTypes.number,
    }

    // 初始化状态
    state = {
        supNum: 10,
        oppNum: 5,
    }

    render() {
        console.log('render渲染')
        let { title } = this.props
        let { supNum, oppNum } = this.state
        return (
            <div className='vote-box'>
                <div className='header'>
                    <h2 className='title'>{title}</h2>
                    <span>{supNum + oppNum}</span>
                </div>
                <div className='main'>
                    <p>支持人数：{supNum}</p>
                    <p>反对人数：{oppNum}</p>
                </div>
                <div className='footer'>
                    <button
                        onClick={() => {
                            this.setState({
                                supNum: supNum + 1,
                            })
                        }}
                    >
                        支持
                    </button>
                    <button
                        onClick={() => {
                            // this.state.oppNum--
                            // this.forceUpdate()
                        }}
                    >
                        反对
                    </button>
                </div>
            </div>
        )
    }

    UNSAFE_componentWillMount() {
        console.log('componentWillMount 第一次渲染之前')
    }

    componentDidMount() {
        console.log('componentDidMount 第一次渲染完毕')
    }

    // 是否允许更新
    // nextState存储要修改的最新状态
    // 次周期函数需要返回true/false，会继续执行下一个操作 true 允许更新 false 不允许更新
    // 如果基于this.forceUpdatre()强制更新视图会跳过shouldComponentUpdate
    shouldComponentUpdate(nextProps, nextState) {
        console.log(
            'shouldComponentUpdate 组件是否允许更新',
            this.state,
            nextState
        )
        return true
    }

    // 状态还没有修改
    UNSAFE_componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate 组件即将更新', this.state, nextState)
    }

    // 组件更新完毕
    componentDidUpdate() {
        console.log('componentDidUpdate 组件更新完毕')
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps 组件即将接收到属性', nextProps)
    }

    componentWillUnmount() {
        console.log('componentWillUnmount 组件即将被卸载')
    }
}

export default Vote
