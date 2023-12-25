import React from 'react'
import './demo2.less'

class Demo extends React.Component {
    render() {
        return (
            <div
                className='outer'
                onClick={() => {
                    console.log('outer 冒泡[合成]')
                }}
                onClickCapture={() => {
                    console.log('outer 捕获[合成]')
                }}
            >
                <div
                    className='inner'
                    onClick={() => {
                        console.log('inner 冒泡[合成]')
                    }}
                    onClickCapture={() => {
                        console.log('inner 捕获[合成]')
                    }}
                ></div>
            </div>
        )
    }

    componentDidMount() {
        document.addEventListener(
            'click',
            () => {
                console.log('body 捕获')
            },
            true
        )
        document.addEventListener(
            'click',
            () => {
                console.log('body 冒泡')
            },
            false
        )

        let root = document.querySelector('#root')
        root.addEventListener(
            'click',
            () => {
                console.log('root 捕获[原生]')
            },
            true
        )
        root.addEventListener(
            'click',
            () => {
                console.log('root 冒泡[原生]')
            },
            false
        )

        let outer = document.querySelector('.outer')
        outer.addEventListener(
            'click',
            () => {
                console.log('outer 捕获[原生]')
            },
            true
        )
        outer.addEventListener(
            'click',
            () => {
                console.log('outer 冒泡[原生]')
            },
            false
        )

        let inner = document.querySelector('.inner')
        inner.addEventListener(
            'click',
            () => {
                console.log('inner 捕获[原生]')
            },
            true
        )
        inner.addEventListener(
            'click',
            () => {
                console.log('inner 冒泡[原生]')
            },
            false
        )
    }
}

export default Demo
