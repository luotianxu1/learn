import React, { useState, useEffect, useMemo } from 'react'
import './Detail.less'
import {
    LeftOutline,
    LikeOutline,
    MessageOutline,
    MoreOutline,
    StarOutline,
} from 'antd-mobile-icons'
import { Badge, Toast } from 'antd-mobile'
import api from '../api'
import SkeletonAgain from '../components/SkeletonAgain'
import { flushSync } from 'react-dom'
import { connect } from 'react-redux'
import action from '../store/action'

const Detail = function Detail(props) {
    let { navigate, params } = props
    // 定义状态
    let [info, setInfo] = useState(null)
    let [extra, setExtra] = useState(null)

    let link
    const handleStyle = (result) => {
        let { css } = result
        if (!Array.isArray(css)) return
        css = css[0]
        if (!css) return
        link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = css
        document.head.appendChild(link)
    }
    const handleImage = (result) => {
        let imgPlaceHolder = document.querySelector('.img-place-holder')
        if (!imgPlaceHolder) return
        // 创建大图
        let tempImg = new Image()
        tempImg.src = result.image
        tempImg.onload = () => {
            imgPlaceHolder.appendChild(tempImg)
        }
        tempImg.onerror = () => {
            let parent = imgPlaceHolder.parentNode
            parent.parentNode.removeChild(parent)
        }
    }

    useEffect(() => {
        ;(async () => {
            try {
                let result = await api.queryNewsInfo(params.id)
                flushSync(() => {
                    setInfo(result)
                    handleStyle(result)
                })
                handleImage(result)
            } catch (_) {}
        })()
        // 销毁组件：移除创建的样式
        return () => {
            if (link) document.head.removeChild(link)
        }
    }, [])
    useEffect(() => {
        ;(async () => {
            try {
                let result = await api.queryNewsStory(params.id)
                setExtra(result)
            } catch (_) {}
        })()
    }, [])

    // ===================登录收藏==============
    let {
        base: { info: userInfo },
        queryuseInfoAsync,
        location,
        store: { list: storeList },
        queryStoreListAsync,
        removeStoreListById,
    } = props
    useEffect(() => {
        ;(async () => {
            // 第一次渲染完，如果userInfo不存在，我们派发任务同步登录者信息
            if (!userInfo) {
                let { info } = await queryuseInfoAsync()
                userInfo = info
            }
            // 如果已经登录&&没有收藏列表信息
            if (userInfo && !storeList) {
                await queryStoreListAsync()
            }
        })()
    }, [])
    // 是否收藏
    const isStore = useMemo(() => {
        if (!storeList) return false
        return storeList.some((item) => +item.news.id === +params.id)
    }, [storeList, params])
    const handleStore = async () => {
        if (!userInfo) {
            Toast.show({
                icon: 'fail',
                content: '请先登录',
            })
            navigate(`/login?to=${location.pathname}`, { replace: true })
            return false
        }
        if (isStore) {
            let item = storeList.find((item) => +item.news.id === +params.id)
            if (!item) return
            let { code } = await api.storeRemove(item.id)
            if (+code !== 0) {
                Toast.show({
                    icon: 'fail',
                    content: '操作失败',
                })
            }
            Toast.show({
                icon: 'success',
                content: '操作成功',
            })
            removeStoreListById(item.id)
            return
        }
        try {
            let { code } = await api.store(params.id)
            if (+code !== 0) {
                Toast.show({
                    icon: 'fail',
                    content: '收藏失败',
                })
            }
            Toast.show({
                icon: 'success',
                content: '收藏成功',
            })
            queryStoreListAsync()
        } catch (_) {}
    }

    return (
        <div className='detail-box'>
            {/* 新闻内容 */}
            {info ? (
                <div
                    className='content'
                    dangerouslySetInnerHTML={{
                        __html: info.body,
                    }}
                ></div>
            ) : (
                <SkeletonAgain></SkeletonAgain>
            )}

            {/* 底部图标 */}
            <div className='tab-bar'>
                <div
                    className='back'
                    onClick={() => {
                        navigate(-1)
                    }}
                >
                    <LeftOutline></LeftOutline>
                </div>
                <div className='icons'>
                    <Badge content={extra ? extra.comments : 0}>
                        <MessageOutline></MessageOutline>
                    </Badge>
                    <Badge content={extra ? extra.popularity : 0}>
                        <LikeOutline></LikeOutline>
                    </Badge>
                    <span
                        className={isStore ? 'stored' : ''}
                        onClick={handleStore}
                    >
                        <StarOutline></StarOutline>
                    </span>
                    <span>
                        <MoreOutline></MoreOutline>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            base: state.base,
            store: state.store,
        }
    },
    {
        ...action.base,
        ...action.store,
    }
)(Detail)
