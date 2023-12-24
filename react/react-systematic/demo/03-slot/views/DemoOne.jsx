import PropTypes from 'prop-types'
import React from 'react'

const DemoOne = function DemoOne(props) {
    let { className, style, title, x, children } = props
    console.log(x)

    children = React.Children.toArray(children)
    console.log(children)
    return (
        <div className={`demo-box ${className}`} style={style}>
            我是DemoOne
            <h2>{title}</h2>
            {children[0]}
            <br />
            {children[1]}
        </div>
    )
}

// 设置默认值
DemoOne.defaultProps = {
    x: 0,
}
//规则校验
DemoOne.propTypes = {
    title: PropTypes.string.isRequired,
    x: PropTypes.number,
}

export default DemoOne
