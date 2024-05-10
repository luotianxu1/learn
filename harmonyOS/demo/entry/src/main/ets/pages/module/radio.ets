@Entry
@Component
struct RadioModule {
  build() {
    Row() {
      Row(){
        Radio({ value: 'Radio1', group: 'radioGroup' })
          .onChange((isChecked: boolean) => {
            if (isChecked) {
              //需要执行的操作
            }
          })
        Text('Radio1')
      }
      Row(){
        Radio({ value: 'Radio2', group: 'radioGroup' })
          .onChange((isChecked: boolean) => {
            if (isChecked) {
              //需要执行的操作
            }
          })
        Text('Radio2')
      }
    }
    .padding(10)
  }
}