import util from '@ohos.util';

class Contact {
  key: string = util.generateRandomUUID(true);
  name: string;
  icon: Resource;

  constructor(name: string, icon: Resource) {
    this.name = name;
    this.icon = icon;
  }
}

const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
  'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


@Entry
@Component
struct ListDemo {
  @State selectedIndex: number = 0;
  private listScroller: Scroller = new Scroller();
  contactsGroups: object[] = [
    {
      title: 'A',
      contacts: [
        new Contact('艾佳', $r('app.media.icon')),
        new Contact('安安', $r('app.media.icon')),
        new Contact('Angela', $r('app.media.icon')),
      ],
    },
    {
      title: 'B',
      contacts: [
        new Contact('白叶', $r('app.media.icon')),
        new Contact('伯明', $r('app.media.icon')),
      ],
    },
    {
      title: 'C',
      contacts: [
        new Contact('艾佳', $r('app.media.icon')),
        new Contact('安安', $r('app.media.icon')),
        new Contact('Angela', $r('app.media.icon')),
      ],
    },
    {
      title: 'D',
      contacts: [
        new Contact('艾佳', $r('app.media.icon')),
        new Contact('安安', $r('app.media.icon')),
        new Contact('Angela', $r('app.media.icon')),
      ],
    },
    {
      title: 'E',
      contacts: [
        new Contact('艾佳', $r('app.media.icon')),
        new Contact('安安', $r('app.media.icon')),
        new Contact('Angela', $r('app.media.icon')),
      ],
    },
    {
      title: 'F',
      contacts: [
        new Contact('艾佳', $r('app.media.icon')),
        new Contact('安安', $r('app.media.icon')),
        new Contact('Angela', $r('app.media.icon')),
      ],
    },
  ]

  @Builder itemHead(text: string) {
    // 列表分组的头部组件，对应联系人分组A、B等位置的组件
    Text(text)
      .fontSize(20)
      .backgroundColor('#fff1f3f5')
      .width('100%')
      .padding(5)
  }

  @Builder itemEnd(data) {
    // 侧滑后尾端出现的组件
    Button({ type: ButtonType.Circle }) {
      Text('删除')
        .fontColor('#fff')
    }
    .width(40)
    .height(40)
    .borderRadius(50)
    .margin({ 'right': 40 })
    .backgroundColor(0xF55A42)
    .onClick(() => {
      console.log(data)
    })
  }

  build() {
    Stack({ alignContent: Alignment.BottomEnd }) {
      List({ scroller: this.listScroller }) {
        ForEach(this.contactsGroups, item => {
          ListItemGroup({ header: this.itemHead(item.title) }) {
            // 循环渲染ListItem
            ForEach(item.contacts, contact => {
              ListItem() {
                Row() {
                  Image(contact.icon)
                    .width(40)
                    .height(40)
                    .margin(10)

                  Text(contact.name)
                    .fontSize(20)

                  Blank()
                }
                .width('100%')
              }
              .swipeAction({ end: this.itemEnd(contact) }) // 设置侧滑属性
            }, contact => contact.name)
          }
          .divider({
            strokeWidth: 1,
            startMargin: 60,
            endMargin: 10,
            color: '#ffe9f0f0'
          })
        })
      }
      .width('100%')
      .height('100%')
      .scrollBar(BarState.Auto) // 滚动条
      .sticky(StickyStyle.Header) // 设置吸顶，实现粘性标题效果
      .onScrollIndex((firstIndex: number) => {
        // 根据列表滚动到的索引值，重新计算对应联系人索引栏的位置this.selectedIndex
        this.selectedIndex = firstIndex
      })

      AlphabetIndexer({ arrayValue: alphabets, selected: 0 })
        .selected(this.selectedIndex)
        .height('100%')

      Button() {
        Text('返回顶部')
      }
      .width(70)
      .height(70)
      .borderRadius('50%')
      .margin({ bottom: 20, right: 20 })
      .backgroundColor('#d2d2d2')
      .onClick(() => {
        // 点击按钮时，指定跳转位置，返回列表顶部
        this.listScroller.scrollToIndex(0)
      })
    }
  }
}