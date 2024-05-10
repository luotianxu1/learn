import router from '@ohos.router';

@Entry
@Component
struct SharedTransitionSrc {
  build() {
    Column() {
      // 配置Exchange类型的共享元素转场，共享元素id为"sharedImage1"
      Column() {
        Text('动画')
      }
      .width(100)
      .height(100)
      .backgroundColor(Color.Red)
      .sharedTransition('sharedImage1', { duration: 1000, curve: Curve.Linear })
      .onClick(() => {
        // 点击小图时路由跳转至下一页面
        router.pushUrl({ url: 'pages/animate/layoutChangeB' });
      })
    }
    .padding(10)
    .width("100%")
    .alignItems(HorizontalAlign.Start)
  }
}