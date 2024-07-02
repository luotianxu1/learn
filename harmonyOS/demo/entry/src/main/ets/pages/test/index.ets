import SharePre from './SharePre'

@Entry
@Component
struct Prefrence {
  @State isOn: boolean = false

  async aboutToAppear() {
    this.isOn = await SharePre.getMode()
  }

  build() {
    Row() {
      Column() {
        Row() {
          Toggle({
            type: ToggleType.Switch,
            isOn: this.isOn
          })
            .onChange(value => {
              SharePre.setMode(value)
            })
          Text('开启夜间模式')
        }
        .width('100%')
      }
      .width('100%')
    }
  }
}