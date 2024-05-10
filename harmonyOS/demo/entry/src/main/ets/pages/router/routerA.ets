import router from '@ohos.router';

@Entry
@Component
struct RouterA {

  onPageShow() {
  }

  build() {
    Column() {
      Text('pageA')
      Column() {
        Text('需要保留主页在页面栈中，以便返回时恢复状态。这种场景下，可以使用pushUrl()方法，并且使用Standard实例模式（或者省略）')
        Button() {
          Text('跳转')
            .fontColor('#fff')
        }
        .width(100)
        .height(40)
        .margin({ top: 10 })
        .onClick(() => {
          router.pushUrl({
            url: 'pages/router/routerB', // 目标url
            params: {
              id: 123,
              info: {
                age: 20
              }
            }
          }, router.RouterMode.Standard, (err) => {
            if (err) {
              console.error(`Invoke pushUrl failed, code is ${err.code}, message is ${err.message}`);
              return;
            }
            console.info('Invoke pushUrl succeeded.');
          });
        })
      }

      Column() {
        Text('需要销毁当前页。这种场景下，可以使用replaceUrl()方法，并且使用Standard实例模式（或者省略）')
        Button() {
          Text('跳转')
            .fontColor('#fff')
        }
        .width(100)
        .height(40)
        .margin({ top: 10 })
        .onClick(() => {
          router.replaceUrl({
            url: 'pages/router/routerB' // 目标url
          }, router.RouterMode.Standard, (err) => {
            if (err) {
              console.error(`Invoke pushUrl failed, code is ${err.code}, message is ${err.message}`);
              return;
            }
            console.info('Invoke pushUrl succeeded.');
          });
        })
      }
      .margin({ top: 10 })

      Column() {
        Text('需要保证每次只有一个pageB切换页存在于页面栈中，在返回时直接回到pageA。这种场景下，可以使用pushUrl()方法，并且使用Single实例模式。')
        Button() {
          Text('跳转')
            .fontColor('#fff')
        }
        .width(100)
        .height(40)
        .margin({ top: 10 })
        .onClick(() => {
          router.pushUrl({
            url: 'pages/router/routerB' // 目标url
          }, router.RouterMode.Single, (err) => {
            if (err) {
              console.error(`Invoke pushUrl failed, code is ${err.code}, message is ${err.message}`);
              return;
            }
            console.info('Invoke pushUrl succeeded.');
          });
        })
      }
      .margin({ top: 10 })

      Column() {
        Text('希望从pageA跳转到pageB。同时，如果pageB已经被查看过，则不需要再新建一个pageB，而是直接跳转到已经存在的pageB。这种场景下，可以使用replaceUrl()方法，并且使用Single实例模式。')
        Button() {
          Text('跳转')
            .fontColor('#fff')
        }
        .width(100)
        .height(40)
        .margin({ top: 10 })
        .onClick(() => {
          router.replaceUrl({
            url: 'pages/router/routerB' // 目标url
          }, router.RouterMode.Single, (err) => {
            if (err) {
              console.error(`Invoke pushUrl failed, code is ${err.code}, message is ${err.message}`);
              return;
            }
            console.info('Invoke pushUrl succeeded.');
          });
        })
      }
      .margin({ top: 10 })
    }
  }


}