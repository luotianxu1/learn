import router from '@ohos.router';

@Entry
@Component
struct Index {
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
      ]
    }
  ]

  build() {
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

  gridColClickHandle(url) {
    router.pushUrl({
      url: url
    })
  }
}