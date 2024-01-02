import React, { useEffect, useState } from 'react'
import HomeHead from '../components/HomeHead'
import { formatTime } from '../assets/utils'
import './Home.less'
import { Swiper, Image, Divider, DotLoading } from 'antd-mobile'
import { Link } from 'react-router-dom'
import api from '../api/index'
import NewsItem from '../components/NewsItem'
import SkeletonAgain from '../components/SkeletonAgain'

const Home = function Home() {
    // 创建所需状态
    let [today, setToday] = useState(formatTime(null, '{0}{1}{2}'))
    let [bannerData, setBannerData] = useState([])

    // 第一次渲染完毕后向服务器发送请求
    useEffect(() => {
        ;(async () => {
            try {
                let { date, stories, top_stories } = await api.queryNewsLatest()
                setToday(date)
                setBannerData(top_stories)
            } catch (_) {}
        })()
    }, [])

    return (
        <div className='home-box'>
            {/* 头部 */}
            <HomeHead today={today}></HomeHead>

            {/* 轮播图 */}
            <div className='swiper-box'>
                {bannerData.length > 0 ? (
                    <Swiper autoplay={true} loop={true}>
                        {bannerData.map((item) => {
                            let { id, image, title, hint } = item
                            return (
                                <Swiper.Item key={id}>
                                    <Link to={{ pathname: `/detail/${id}` }}>
                                        <Image src={image} lazy></Image>
                                        <div className='desc'>
                                            <h3 className='title'>{title}</h3>
                                            <p className='author'>{hint}</p>
                                        </div>
                                    </Link>
                                </Swiper.Item>
                            )
                        })}
                    </Swiper>
                ) : null}
            </div>

            {/* 新闻列表 */}
            <SkeletonAgain></SkeletonAgain>
            <div className='news-box'>
                <Divider contentPosition='left'>2020123</Divider>
                <div className='list'>
                    <NewsItem></NewsItem>
                    <NewsItem></NewsItem>
                    <NewsItem></NewsItem>
                    <NewsItem></NewsItem>
                </div>
            </div>
            <div className='news-box'>
                <Divider contentPosition='left'>2020123</Divider>
                <div className='list'>
                    <NewsItem></NewsItem>
                    <NewsItem></NewsItem>
                    <NewsItem></NewsItem>
                    <NewsItem></NewsItem>
                </div>
            </div>
            <div className='news-box'>
                <Divider contentPosition='left'>2020123</Divider>
                <div className='list'>
                    <NewsItem></NewsItem>
                    <NewsItem></NewsItem>
                    <NewsItem></NewsItem>
                    <NewsItem></NewsItem>
                </div>
            </div>

            {/* 加载更多 */}
            <div className='loadmore-box'>
                <DotLoading></DotLoading>
                数据加载中
            </div>
        </div>
    )
}

export default Home
