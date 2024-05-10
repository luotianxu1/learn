@Entry
@Component
struct ToggleModule {
  build() {
    Column() {
      Column() {
        Row() {
          Toggle({ type: ToggleType.Checkbox, isOn: false })
          Text('1')
        }

        Row() {
          Toggle({ type: ToggleType.Checkbox, isOn: true })
          Text('2')
        }
      }

      Column() {
        Toggle({ type: ToggleType.Switch, isOn: false })
      }

      Column() {
        Toggle({ type: ToggleType.Button, isOn: false }) {
          Text('status button')
            .fontColor('#182431')
            .fontSize(12)
        }.width(100)

        Toggle({ type: ToggleType.Button, isOn: true }) {
          Text('status button')
            .fontColor('#182431')
            .fontSize(12)
        }.width(100)
      }

      Column() {
        Toggle({ type: ToggleType.Button, isOn: true }) {
          Text('status button')
            .fontColor('#182431')
            .fontSize(12)
        }.width(100).selectedColor(Color.Pink)
        Toggle({ type: ToggleType.Checkbox, isOn: true })
          .selectedColor(Color.Pink)
        Toggle({ type: ToggleType.Switch, isOn: true })
          .selectedColor(Color.Pink)
      }
    }
    .padding(10)
  }
}