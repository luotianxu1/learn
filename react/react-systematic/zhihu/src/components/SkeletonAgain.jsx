import React from 'react'
import { Skeleton } from 'antd-mobile'
import './SkeletonAgain.less'

const SkeletonAgain = function SkeletonAgain() {
    return (
        <div className='skeleton-again-box'>
            <Skeleton.Title animated></Skeleton.Title>
            <Skeleton.Paragraph lineCount={5} animated></Skeleton.Paragraph>
        </div>
    )
}

export default SkeletonAgain
