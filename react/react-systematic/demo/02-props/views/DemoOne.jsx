import PropTypes from 'prop-types'

const DemoOne = function DemoOne(props) {
    let { className, style, title, x } = props
    console.log(x)

    return (
        <div className={`demo-box ${className}`} style={style}>
            我是DemoOne
            <h2>{title}</h2>
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
