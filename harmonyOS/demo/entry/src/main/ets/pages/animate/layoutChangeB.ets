import router from '@ohos.router';
@Entry
@Component
struct SharedTransitionDest {
  build() {
    Column() {
      // 配置Static类型的共享元素转场
      Text("SharedTransition dest page")
        .fontSize(16)
        .sharedTransition('text', { duration: 500, curve: Curve.Linear, type: SharedTransitionEffectType.Static })
        .margin({ top: 10 })

      // 配置Exchange类型的共享元素转场，共享元素id为"sharedImage1"
      Column() {
        Text('动画')
      }
      .width(300)
      .height(300)
      .backgroundColor(Color.Blue)
      .sharedTransition('sharedImage1', { duration: 500, curve: Curve.Linear })
      .onClick(() => {
        // 点击图片时路由返回至上一页面
        router.back();
      })
    }
    .width("100%")
    .alignItems(HorizontalAlign.Center)
  }
}