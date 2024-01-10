import { Spin } from 'antd'

// 路由懒加载中，动态导入组件的JS，在导入加载之前的Loading效果
export default () => {
    return (
        <div>
            <Spin size='large' tip='加载中'></Spin>
        </div>
    )
}
