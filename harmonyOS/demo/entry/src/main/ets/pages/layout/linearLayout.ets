@Entry
@Component
struct LinearLayout {

  build() {
    Column() {
      Column() {
        Text('纵向排列')
          .fontColor(Color.White)
        Column({ space: 20 }) {
          Row().width('100%').height('20%').backgroundColor(0xF5DEB3)
          Row().width('100%').height('20%').backgroundColor(0xD2B48C)
          // 自适应拉伸
          Blank()
          Row().width('100%').height('20%').backgroundColor(0xF5DEB3)
        }
        .height('100%')
      }
      .width('100%')
      .height('50%')
      .backgroundColor(Color.Red)

      Column() {
        Text('横向排列')
          .fontColor(Color.White)
        Row({ space: 20 }) {
          Row().layoutWeight(1).height('100%').backgroundColor(0xF5DEB3)
          Row().layoutWeight(2).height('100%').backgroundColor(0xD2B48C)
          Row().width('10%').height('100%').backgroundColor(0xF5DEB3)
        }
        .width('100%')
      }
      .width('100%')
      .height('50%')
      .backgroundColor(Color.Blue)
    }
    .width('100%')
    .height('100%')
  }
}