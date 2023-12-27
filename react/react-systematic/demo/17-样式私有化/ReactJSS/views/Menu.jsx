import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    box: {
        backgroundColor: 'lightpink',
        width: '400px',
    },
    list: {
        '& li': {
            lineHeight: '30px',
            '&:hover': {
                color: 'red',
            },
        },
    },
})

class Menu extends React.Component {
    render() {
        let { box, list } = this.props

        return (
            <div className={box}>
                <ul className={list}>
                    <li>手机</li>
                    <li>电脑</li>
                    <li>家电</li>
                </ul>
            </div>
        )
    }
}

const ProxyComponent = function ProxyComponent(Component) {
    return function HOC(props) {
        let sty = useStyles()
        return <Component {...props} {...sty}></Component>
    }
}

export default ProxyComponent(Menu)
