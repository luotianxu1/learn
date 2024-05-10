@Entry
@Component
struct ShapePage {
  private scroller: Scroller = new Scroller();

  build() {
    Scroll(this.scroller) {
      Column() {
        Column() {
          Shape() {
            Rect().width("100%").height("100%").fill("#0097D4")
            Circle({ width: 150, height: 150 }).fill("#E87361")
          }
          .viewPort({ x: 0, y: 0, width: 300, height: 300 })
          .width(300)
          .height(300)
          .backgroundColor("#F5DC62")
        }

        Column() {
          Shape() {
            Rect().width("100%").height("100%").fill("#0097D4")
            Circle({ width: 150, height: 150 }).fill("#E87361")
          }
          .viewPort({ x: -150, y: -150, width: 300, height: 300 })
          .width(300)
          .height(300)
          .backgroundColor("#F5DC62")
        }
        .margin({top:10})

        Column() {
          Shape() {
            Path()
              .width(100)
              .height(100)
              .commands('M150 0 L300 300 L0 300 Z')
              .fill("#E87361")
          }
        }
        .margin({top:10})

        Column() {
          Shape() {
            Path()
              .width(100)
              .height(100)
              .fillOpacity(0)
              .commands('M150 0 L300 300 L0 300 Z')
              .stroke(Color.Red)
          }
        }
        .margin({top:10})
      }
    }
  }
}