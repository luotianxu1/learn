@Entry
@Component
struct TextInputModule {
  build() {
    Column() {
      Column() {
        TextInput({placeholder:'我是提示文本'})
          .type(InputType.Normal)
          .backgroundColor(Color.Pink)
          .onChange((value: string) => {
            console.info(value);
          })
          .onFocus(() => {
            console.info('获取焦点');
          })
      }

      Column() {
        TextInput({text:'我是当前文本内容'})
          .type(InputType.Password)
      }
      .margin({top:10})

      Column() {
        TextArea({text:"我是TextArea我是TextArea我是TextArea我是TextArea"}).width(300)
      }
    }
  }
}