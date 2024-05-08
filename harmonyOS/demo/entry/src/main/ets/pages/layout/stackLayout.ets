@Entry
@Component
struct StackLayout {
  build() {
    Stack({ alignContent: Alignment.BottomStart }) {
      Column() {
        Text('Stack子元素1').fontSize(20)
      }.width(150).height(150).backgroundColor(Color.Pink).zIndex(1)

      Column() {
        Text('Stack子元素2').fontSize(20)
      }.width(200).height(200).backgroundColor(Color.Grey).zIndex(0)

      Column() {
        Text('Stack子元素3').fontSize(20)
      }.width(100).height(100).backgroundColor(0xffd306).zIndex(2)
    }.margin({ top: 100 }).width(350).height(350).backgroundColor(0xe0e0e0)
  }
}