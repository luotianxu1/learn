@Entry
@Component
struct Tab {
  @State currentIndex: number = 0
  private tabsController: TabsController = new TabsController()

  @Builder TabBuilder(title: string, targetIndex: number, selectedImg: Resource, normalImg: Resource) {
    Column() {
      Image(this.currentIndex === targetIndex ? selectedImg : normalImg)
        .size({ width: 25, height: 25 })
      Text(title)
        .fontColor(this.currentIndex === targetIndex ? '#1698CE' : '#6B6B6B')
    }
    .width('100%')
    .height(50)
    .justifyContent(FlexAlign.Center)
    .onClick(() => {
      this.currentIndex = targetIndex;
      this.tabsController.changeIndex(this.currentIndex);
    })
  }

  build() {
    Column() {
      Column() {
        Tabs({ barPosition: BarPosition.Start }) {
          TabContent() {
            Text('首页的内容').fontSize(30)
          }
          .tabBar('首页')

          TabContent() {
            Text('推荐的内容').fontSize(30)
          }
          .tabBar('推荐')

          TabContent() {
            Text('发现的内容').fontSize(30)
          }
          .tabBar('发现')

          TabContent() {
            Text('我的内容').fontSize(30)
          }
          .tabBar("我的")
        }
        .vertical(true)
        .barWidth(100)
        .barHeight(200)
        .scrollable(false)
        .barMode(BarMode.Scrollable)
      }
      .height('50%')

      Column() {
        Tabs({ barPosition: BarPosition.Start, controller: this.tabsController }) {
          TabContent() {
            Column() {
              Text('我的内容')
            }
            .height('100%')
          }
          .tabBar(this.TabBuilder('我的', 0, $r('app.media.icon'), $r('app.media.icon')))

          TabContent() {
            Column() {
              Text('推荐的内容')
            }
            .height('100%')
          }
          .tabBar(this.TabBuilder('推荐', 1, $r('app.media.icon'), $r('app.media.icon')))

          TabContent() {
            Column() {
              Text('发现的内容').fontSize(30)
            }
            .height('100%')
          }
          .tabBar(this.TabBuilder('发现', 2, $r('app.media.icon'), $r('app.media.icon')))

          TabContent() {
            Column() {
              Text('我的内容').fontSize(30)
            }
            .height('100%')
          }
          .tabBar(this.TabBuilder('我的', 3, $r('app.media.icon'), $r('app.media.icon')))
        }
      }
    }
    .height('100%')
  }
}