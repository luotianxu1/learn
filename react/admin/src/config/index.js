export default [
    {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'HomeOutlined',
        url: '/home/index',
    },
    {
        path: '/user',
        name: 'user',
        label: '用户管理',
        icon: 'UserOutlined',
        url: '/user/index',
    },
    {
        path: '/other',
        label: '其他',
        icon: 'SettingOutlined',
        children: [
            {
                path: '/other/pageOne',
                name: 'page1',
                label: '页面1',
                icon: 'SettingOutlined',
            },
        ],
    },
]
