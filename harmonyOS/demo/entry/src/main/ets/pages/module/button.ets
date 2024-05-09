@Entry
@Component
struct ButtonModule {
  build() {
    Column() {
      Button('Ok', { type: ButtonType.Normal, stateEffect: true })
        .width(90)
        .height(40)

      Button({ type: ButtonType.Normal, stateEffect: true }) {
        Row() {
          Image($r('app.media.icon')).width(20).height(40).margin({ left: 12 })
          Text('loading').fontSize(12).fontColor(0xffffff).margin({ left: 5, right: 12 })
        }.alignItems(VerticalAlign.Center)
      }
      .width(90)
      .height(40)
      .margin({ top: 10 })

      Button('Disable', { type: ButtonType.Capsule, stateEffect: false })
        .width(90)
        .height(40)
        .margin({ top: 10 })

      Button('Circle', { type: ButtonType.Circle, stateEffect: false })
        .width(70)
        .height(70)
        .margin({ top: 10 })
    }
    .padding(10)
  }
}