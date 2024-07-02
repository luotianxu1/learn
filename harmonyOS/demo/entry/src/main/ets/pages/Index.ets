import router from '@ohos.router';

@Entry
@Component
struct Index {
  private scroller: Scroller = new Scroller();
  private contacts = [
    {
      name: '布局',
      children: [
        {
          name: '线性布局',
          url: 'pages/layout/linearLayout'
        },
        {
          name: '层叠布局',
          url: 'pages/layout/stackLayout'
        },
        {
          name: '弹性布局',
          url: 'pages/layout/flexLayout'
        },
        {
          name: '相对布局',
          url: 'pages/layout/relativeLayout'
        },
        {
          name: '栅格布局',
          url: 'pages/layout/gridRowLayout'
        },
        {
          name: '媒体查询',
          url: 'pages/layout/mediaQueryExample'
        },
        {
          name: '列表',
          url: 'pages/layout/list'
        },
        {
          name: '列表通讯录',
          url: 'pages/layout/listDemo'
        },
        {
          name: '网格布局',
          url: 'pages/layout/gridLayout'
        },
        {
          name: '轮播',
          url: 'pages/layout/swiper'
        }
      ]
    },
    {
      name: '组件',
      children:[
        {
          name: '按钮',
          url: 'pages/module/button'
        },
        {
          name: '单选框',
          url: 'pages/module/radio'
        },
        {
          name: '切换按钮',
          url: 'pages/module/toggle'
        },
        {
          name: '进度条',
          url: 'pages/module/progress'
        },
        {
          name: '文本',
          url: 'pages/module/text'
        },
        {
          name: '文本输入',
          url: 'pages/module/textInput'
        },
        {
          name: '弹窗',
          url: 'pages/module/customDialog'
        },
        {
          name: '提示框',
          url: 'pages/module/popup'
        },
        {
          name: '菜单',
          url: 'pages/module/menu'
        },
      ]
    },
    {
      name: '路由和导航',
      children:[
        {
          name: '路由',
          url: 'pages/router/routerA'
        },
        {
          name: 'Tab',
          url: 'pages/router/tab'
        }
      ]
    },
    {
      name: '图形',
      children:[
        {
          name: '几何图形',
          url: 'pages/graph/shape'
        },
        {
          name: 'Canvas',
          url: 'pages/graph/canvas'
        },
      ]
    },
    {
      name: '动画',
      children:[
        {
          name: '布局更新动画',
          url: 'pages/animate/layoutChange'
        },
        {
          name: '组件大小动画',
          url: 'pages/animate/pageChange'
        },
        {
          name: '页面切换动画',
          url: 'pages/animate/pageTransitionSrc'
        },
      ]
    },
    {
      name: '通知',
      children:[
        {
          name: '通知',
          url: 'pages/notification/index'
        },
      ]
    },
    {
      name: '案例',
      children:[
        {
          name: '二级联动',
          url: 'pages/demo/secondLevelLink/page/index'
        },
      ]
    }
  ]

  build() {
    Scroll(this.scroller) {
      Column() {
        ForEach(this.contacts, (data, index) => {
          Text(data.name)
            .padding({ top: 10 })
          GridRow({ columns: 2, gutter: 10 }) {
            ForEach(data.children, (item, index) => {
              GridCol() {
                Row() {
                  Text(`${item.name}`)
                    .width('100%')
                    .textAlign(TextAlign.Center)
                }
                .width('100%')
                .height('80')
                .onClick(() => this.gridColClickHandle(item.url))
              }
              .backgroundColor('#eee')
              .borderRadius(10)
            })
          }
          .padding(10)
        })
      }
    }
  }

  gridColClickHandle(url) {
    router.pushUrl({
      url: url
    })
  }
}