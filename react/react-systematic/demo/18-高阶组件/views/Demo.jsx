import React from 'react'

const Demo = function Demo(props) {
    console.log('Demo中的属性', props)
    return <div className='demo'>我是DEDMO</div>
}

const Proxytext = function ProxyTest(Component) {
    return function HOC(props) {
        console.log('HOC中的属性', arguments)
        return <Component {...props} />
    }
}

export default Proxytext(Demo)
