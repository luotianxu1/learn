@Entry
@Component
struct ListLayout {
  @State listData: string[] = ['北京', '天津', '河北', '杭州', '上海', '昆明', '石家庄', '苏州', '南京']

  build() {
    Column() {
      Column() {
        List({ space: 10 }) {
          ForEach(this.listData, (item, index) => {
            ListItem() {
              Text(item).height(80).fontSize(24)
            }
            .width('100%')
            .backgroundColor('#fff')
          })
        }
        .width('100%')
        .height('100%')
        .alignListItem(ListItemAlign.Center)
        .divider({
          strokeWidth: 1,
          startMargin: 60,
          endMargin: 10,
          color: '#ffe9f0f0'
        })
        .scrollBar(BarState.Auto)
      }
      .width('100%')
      .height('50%')

      Column() {
        List({ space: 10 }) {
          ForEach(this.listData, (item, index) => {
            ListItem() {
              Text(item).height(80).fontSize(24)
            }
            .backgroundColor('#fff')
          })
        }
        .width('100%')
        .height('100%')
        .alignListItem(ListItemAlign.Center)
        .listDirection(Axis.Horizontal)
        .scrollBar(BarState.Auto)
      }
      .width('100%')
      .height('50%')
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#eee')
  }
}