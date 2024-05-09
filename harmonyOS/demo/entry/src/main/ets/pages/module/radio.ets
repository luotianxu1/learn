@Entry
@Component
struct RadioModule {
  build() {
    Column() {
      Radio({ value: 'Radio1', group: 'radioGroup' })
        .onChange((isChecked: boolean) => {
          if (isChecked) {
            //需要执行的操作
          }
        })
      Radio({ value: 'Radio2', group: 'radioGroup' })
        .onChange((isChecked: boolean) => {
          if (isChecked) {
            //需要执行的操作
          }
        })
    }
    .padding(10)
  }
}