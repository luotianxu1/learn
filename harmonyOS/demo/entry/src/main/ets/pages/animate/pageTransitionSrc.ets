// PageTransitionSrc2
import router from '@ohos.router';
@Entry
@Component
struct PageTransitionSrc2 {
  build() {
    Column() {
      Column() {
        Text('123456')
      }
      .width('90%')
      .height('80%')
      .margin(30)
      .backgroundColor(Color.Red)

      Row({ space: 10 }) {
        Button("pushUrl")
          .onClick(() => {
            // 路由到下一页面，push操作
            router.pushUrl({ url: 'pages/animate/PageTransitionDst2' });
          })
        Button("back")
          .onClick(() => {
            // 返回到上一页面，相当于pop操作
            router.back();
          })
      }.justifyContent(FlexAlign.Center)
    }
    .width("100%").height("100%")
    .alignItems(HorizontalAlign.Center)
  }

  pageTransition() {
    // 定义页面进入时的效果，从左侧滑入，时长为1000ms，无论页面栈发生push还是pop操作均可生效
    PageTransitionEnter({ duration: 1000 })
      .slide(SlideEffect.Left)
    // 定义页面退出时的效果，相对于正常页面位置x方向平移100vp，y方向平移100vp，透明度变为0，时长为1200ms，无论页面栈发生push还是pop操作均可生效
    PageTransitionExit({ duration: 1200 })
      .translate({ x: 100.0, y: 100.0 })
      .opacity(0)
  }
}