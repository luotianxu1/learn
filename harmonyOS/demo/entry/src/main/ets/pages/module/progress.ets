@Entry
@Component
struct ProgressModule {
  @State progressValue: number = 0    // 设置进度条初始值为0

  build() {
    Column() {
      Column() {
        Progress({ value: 20, total: 100, type: ProgressType.Linear }).width(200).height(50)
      }

      Column() {
        Progress({ value: 20, total: 100, type: ProgressType.Linear }).width(50).height(200)
      }

      Column() {
        Progress({ value: 40, total: 150, type: ProgressType.Ring }).width(100).height(100)
          .color(Color.Grey) // 进度条前景色为灰色
          .style({ strokeWidth: 15 }) // 设置strokeWidth进度条宽度为15.0vp
      }

      Column() {
        Progress({ value: 20, total: 150, type: ProgressType.ScaleRing }).width(100).height(100)
          .backgroundColor(Color.Black)
          .style({ strokeWidth: 15, scaleCount: 20, scaleWidth: 3 }) // 设置环形有刻度进度条宽度15，总刻度数为20，刻度宽度为3vp
      }

      Column() {
        Progress({ value: 20, total: 150, type: ProgressType.Eclipse }).color(Color.Grey).width(100).height(100)
      }

      Column(){
        Progress({ value: 50, total: 150, type: ProgressType.Capsule }).width(50).height(100).color(Color.Grey).backgroundColor(Color.Black)
      }

      Column() {
        Column() {
          Progress({value:0, total:100, type:ProgressType.Capsule}).width(200).height(50)
            .style({strokeWidth:50}).value(this.progressValue)
          Row().width('100%').height(5)
          Button("进度条+5")
            .onClick(()=>{
              this.progressValue += 5
              if (this.progressValue > 100){
                this.progressValue = 0
              }
            })
        }
      }.width('100%').height('100%')
    }
    .padding(10)
  }
}