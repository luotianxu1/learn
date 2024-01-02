import React from 'react'
import './NewsItem.less'
import { Image } from 'antd-mobile'
import { Link } from 'react-router-dom'

const NewsItem = function NewsItem() {
    return (
        <div className='news-item-box'>
            <Link to={{ pathname: `detail/xxx` }}>
                <div className='content'>
                    <h4 className='title'>asdfadf</h4>
                    <p className='author'></p>
                </div>
                <Image lazy></Image>
            </Link>
        </div>
    )
}

export default NewsItem
