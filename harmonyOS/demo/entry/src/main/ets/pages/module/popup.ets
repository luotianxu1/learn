@Entry
@Component
struct PopupModule {
  @State handlePopup: boolean = false
  @State customPopup: boolean = false

  // popup构造器定义弹框内容
  @Builder popupBuilder() {
    Row({ space: 2 }) {
      Image($r("app.media.icon")).width(24).height(24).margin({ left: 5 })
      Text('This is Custom Popup').fontSize(15)
    }.width(200).height(50).padding(5)
  }

  build() {
    Column() {
      Column() {
        Button('PopupOptions').margin({ top: 200 })
          .onClick(() => {
            this.handlePopup = !this.handlePopup
          })
          .bindPopup(this.handlePopup, {
            message: 'This is a popup with PopupOptions',
            primaryButton: {
              value: 'Confirm',
              action: () => {
                this.handlePopup = !this.handlePopup
                console.info('confirm Button click')
              }
            },
            secondaryButton: {
              value: 'Cancel',
              action: () => {
                this.handlePopup = !this.handlePopup
              }
            },
            onStateChange: (e) => {
              if (!e.isVisible) {
                this.handlePopup = false
              }
            }
          })
      }

      Column() {
        Button('CustomPopupOptions')
          .onClick(() => {
            this.customPopup = !this.customPopup
          })
          .bindPopup(this.customPopup, {
            builder: this.popupBuilder, // 气泡的内容
            placement: Placement.Bottom, // 气泡的弹出位置
            popupColor: Color.Pink, // 气泡的背景色
            onStateChange: (e) => {
              console.info(JSON.stringify(e.isVisible))
              if (!e.isVisible) {
                this.customPopup = false
              }
            }
          })
      }
    }.width('100%').padding({ top: 5 })
  }
}