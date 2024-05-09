@Entry
@Component
struct SwiperLayout {
  private swiperController: SwiperController = new SwiperController()

  build() {
    Swiper(this.swiperController) {
      Text("0")
        .width('100%')
        .height('100%')
        .backgroundColor(Color.Gray)
        .textAlign(TextAlign.Center)
        .fontSize(30)

      Text("1")
        .width('100%')
        .height('100%')
        .backgroundColor(Color.Green)
        .textAlign(TextAlign.Center)
        .fontSize(30)

      Text("2")
        .width('100%')
        .height('100%')
        .backgroundColor(Color.Blue)
        .textAlign(TextAlign.Center)
        .fontSize(30)
    }
    .loop(true)
    .autoPlay(true)
    .interval(1000)
  }
}