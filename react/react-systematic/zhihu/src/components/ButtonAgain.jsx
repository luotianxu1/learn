import { Button } from 'antd-mobile'
import React, { useState } from 'react'

const ButtonAgain = function ButtonAgain(props) {
    let options = { ...props }
    let { children, onClick: handle } = options
    delete options.children

    // 状态
    let [loading, setLoading] = useState(false)
    const clickHandle = async () => {
        setLoading(true)
        try {
            await handle()
        } catch (_) {}
        setLoading(false)
    }

    if (handle) {
        options.onClick = clickHandle
    }

    return (
        <Button {...options} loading={loading}>
            {children}
        </Button>
    )
}

export default ButtonAgain
