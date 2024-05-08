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
          url: 'pages/layout/gridLayout'
        }
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