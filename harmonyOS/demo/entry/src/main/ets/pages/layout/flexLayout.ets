@Entry
@Component
struct FlexLayout {
  build() {
    Flex({
      direction: FlexDirection.Row,
      wrap: FlexWrap.Wrap,
      alignItems: ItemAlign.Center,
      justifyContent: FlexAlign.End,
      alignContent: FlexAlign.Center
    }) {
      Text('1').width('20%').height(20).backgroundColor(0xF5DEB3)
      Text('2').width('30%').height(30).backgroundColor(0xD2B48C)
      Text('3').width('40%').height(40).backgroundColor(0xF5DEB3)
      Text('4').width('50%').height(50).backgroundColor(0xD2B48C)
    }
    .height('50%')
    .width('100%')
    .padding(10)
    .backgroundColor(0xAFEEEE)
  }
}