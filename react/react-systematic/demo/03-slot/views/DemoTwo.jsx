import React from 'react'

const DemoTwo = function DemoOne(props) {
    let { children } = props
    children = React.Children.toArray(children)

    let headerSlot = []
    let footerSlot = []
    let defaultSlot = []
    children.forEach((child) => {
        let { slot } = child.props
        if (slot === 'header') {
            headerSlot.push(child)
        } else if (slot === 'footer') {
            footerSlot.push(child)
        } else {
            defaultSlot.push(child)
        }
    })

    return (
        <div className='demo-box'>
            {headerSlot}
            <br />
            {footerSlot}
        </div>
    )
}

export default DemoTwo
