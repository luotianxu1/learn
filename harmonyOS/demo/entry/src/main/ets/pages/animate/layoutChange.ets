import curves from '@ohos.curves';

@Entry
@Component
struct LayoutChange {
  private scroller: Scroller = new Scroller();
  @State itemAlign: HorizontalAlign = HorizontalAlign.Start;
  @State allAlign: HorizontalAlign[] = [HorizontalAlign.Start, HorizontalAlign.Center, HorizontalAlign.End];
  @State alignIndex: number = 0;
  @State myWidth: number = 100;
  @State myHeight: number = 50;
  @State flag: boolean = false;
  @State myColor: Color = Color.Blue;
  @State numbers: string[] = ["1", "2", "3", "4", "5"]
  @State startNumber: number = 6;
  @State translateX: number = 0;

  private jumpWithSpeed(speed: number) {
    this.translateX = -1;
    animateTo({ duration: 2000, curve: curves.springCurve(speed, 1, 1, 1.2) }, () => {
      // 以指定初速度进行x方向的平移的弹簧动画
      this.translateX = 0;
    })
  }

  build() {
    Scroll(this.scroller) {
      Column() {
        Column() {
          Column({ space: 10 }) {
            Button("1").width(100).height(50)
          }
          .margin(20)
          .alignItems(this.itemAlign)
          .borderWidth(2)
          .width("90%")
          .height(100)

          Button("click").onClick(() => {
            // 动画时长为1000ms，曲线为EaseInOut
            animateTo({ duration: 1000, curve: Curve.EaseInOut }, () => {
              this.alignIndex = (this.alignIndex + 1) % this.allAlign.length;
              // 在闭包函数中修改this.itemAlign参数，使Column容器内部孩子的布局方式变化，使用动画过渡到新位置
              this.itemAlign = this.allAlign[this.alignIndex];
            });
          })
        }

        Column() {
          Button("text")
            .type(ButtonType.Normal)
            .width(this.myWidth)
            .height(this.myHeight)
              // animation只对其上面的type、width、height属性生效，时长为1000ms，曲线为Ease
            .animation({ duration: 1000, curve: Curve.Ease })
              // animation对下面的backgroundColor、margin属性不生效
            .backgroundColor(this.myColor)
            .margin(20)

          Button("area: click me")
            .fontSize(12)
            .onClick(() => {
              // 改变属性值，配置了属性动画的属性会进行动画过渡
              if (this.flag) {
                this.myWidth = 100;
                this.myHeight = 50;
                this.myColor = Color.Blue;
              } else {
                this.myWidth = 200;
                this.myHeight = 100;
                this.myColor = Color.Pink;
              }
              this.flag = !this.flag;
            })
        }

        Column() {
          Column() {
            ForEach(this.numbers, (item) => {
              // ForEach下的直接组件需配置transition效果
              Text(item)
                .width(240)
                .height(60)
                .fontSize(18)
                .borderWidth(1)
                .backgroundColor(Color.Orange)
                .textAlign(TextAlign.Center)
                .transition({ type: TransitionType.All, translate: { x: 200 }, scale: { x: 0, y: 0 } })
            }, item => item)
          }
          .margin(10)
          .justifyContent(FlexAlign.Start)
          .alignItems(HorizontalAlign.Center)
          .width("90%")
          .height("50%")

          Flex() {
            Button('向头部添加元素')
              .fontSize(16)
              .width(160)
              .onClick(() => {
                animateTo({ duration: 1000 }, () => {
                  // 往数组头部插入一个元素，导致ForEach在头部增加对应的组件
                  this.numbers.unshift(this.startNumber.toString());
                  this.startNumber++;
                })
              })
            Button('删除头部元素')
              .width(160)
              .fontSize(16)
              .onClick(() => {
                animateTo({ duration: 1000 }, () => {
                  // 删除数组的头部元素，导致ForEach删除头部的组件
                  this.numbers.shift();
                })
              })
          }
        }

        Column() {
          Button("button")
            .fontSize(14)
            .width(100)
            .height(50)
            .margin(30)
            .translate({ x: this.translateX })
          Row({ space: 50 }) {
            Button("jump 50").fontSize(14)
              .onClick(() => {
                // 以初速度50的弹簧曲线进行平移
                this.jumpWithSpeed(50);
              })
            Button("jump 200").fontSize(14)
              .onClick(() => {
                // 以初速度200的弹簧曲线进行平移
                this.jumpWithSpeed(200);
              })
          }.margin(30)

        }
      }
    }
  }
}