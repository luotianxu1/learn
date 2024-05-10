import router from '@ohos.router';
import promptAction from '@ohos.promptAction';

@Entry
@Component
struct RouterB {

  onPageShow() {
    const params = router.getParams(); // 获取传递过来的参数对象
    const id = params['id']; // 获取id属性的值
    const age = params['info'].age; // 获取age属性的值
    console.log(id,age)
  }

  build() {
    Column() {
      Text('pageB')
      Column() {
        Button() {
          Text('返回上一页')
            .fontColor('#fff')
        }
        .width(100)
        .height(40)
        .onClick(() => {
          router.back()
        })
      }

      Column() {
        Button() {
          Text('返回指定页')
            .fontColor('#fff')
        }
        .width(100)
        .height(40)
        .onClick(() => {
          router.back({
            url: 'pages/Index'
          });
        })
      }
      .margin({top:10})

      Column() {
        Button() {
          Text('返回指定页并传递参数')
            .fontColor('#fff')
        }
        .width(100)
        .height(40)
        .onClick(() => {
          router.back({
            url: 'pages/router/routerA',
            params: {
              info: '来自pageB页'
            }
          });
        })
      }
      .margin({top:10})

      Column() {
        Button() {
          Text('返回询问框')
            .fontColor('#fff')
        }
        .width(100)
        .height(40)
        .onClick(() => {
          try {
            router.showAlertBeforeBackPage({
              message: '您还没有完成支付，确定要返回吗？' // 设置询问框的内容
            });
          } catch (err) {
            console.error(`Invoke showAlertBeforeBackPage failed, code is ${err.code}, message is ${err.message}`);
          }

          // 调用router.back()方法，返回上一个页面
          router.back();
        })
      }
      .margin({top:10})

      Column() {
        Button() {
          Text('自定义返回框')
            .fontColor('#fff')
        }
        .width(100)
        .height(40)
        .onClick(() => {
          // 弹出自定义的询问框
          promptAction.showDialog({
            message: '您还没有完成支付，确定要返回吗？',
            buttons: [
              {
                text: '取消',
                color: '#FF0000'
              },
              {
                text: '确认',
                color: '#0099FF'
              }
            ]
          }).then((result) => {
            if (result.index === 0) {
              // 用户点击了“取消”按钮
              console.info('User canceled the operation.');
            } else if (result.index === 1) {
              // 用户点击了“确认”按钮
              console.info('User confirmed the operation.');
              // 调用router.back()方法，返回上一个页面
              router.back();
            }
          }).catch((err) => {
            console.error(`Invoke showDialog failed, code is ${err.code}, message is ${err.message}`);
          })
        })
      }
      .margin({top:10})
    }
  }
}