@Entry
@Component
struct MenuModule {
  @State select: boolean = true

  @Builder
  SubMenu() {
    Menu() {
      MenuItem({ content: "复制", labelInfo: "Ctrl+C" })
      MenuItem({ content: "粘贴", labelInfo: "Ctrl+V" })
    }
  }


  private iconStr: ResourceStr = $r("app.media.icon")
  private iconStr2: ResourceStr = $r("app.media.icon")
  @Builder
  MyMenu(){
    Menu() {
      MenuItem({ startIcon: $r("app.media.icon"), content: "菜单选项1" })
      MenuItem({ startIcon: $r("app.media.icon"), content: "菜单选项2" }).enabled(false)
      MenuItem({
        startIcon: this.iconStr,
        content: "菜单选项3",
        endIcon: $r("app.media.icon"),
        // 当builder参数进行配置时，表示与menuItem项绑定了子菜单。鼠标hover在该菜单项时，会显示子菜单。
        builder: this.SubMenu,
      })
      MenuItemGroup({ header: '小标题' }) {
        MenuItem({ content: "菜单选项4" })
          .selectIcon(true)
          .selected(this.select)
          .onChange((selected) => {
            console.info("menuItem select" + selected);
            this.iconStr2 = $r("app.media.icon");
          })
        MenuItem({
          startIcon: $r("app.media.icon"),
          content: "菜单选项5",
          endIcon: $r("app.media.icon"),
          builder: this.SubMenu.bind(this)
        })
      }
      MenuItem({
        startIcon: this.iconStr2,
        content: "菜单选项6",
        endIcon: $r("app.media.icon")
      })
    }
  }

  build() {
    Column() {
      Column() {
        Button('click for Menu')
          .bindMenu([
            {
              value: 'Menu1',
              action: () => {
                console.info('handle Menu1 select')
              }
            }
          ])
      }

      Column() {
        Button('click for Menu')
          .bindMenu(this.MyMenu)
      }

      Column() {
        Button('click for Menu')
          .bindContextMenu(this.MyMenu, ResponseType.RightClick)
      }
    }
  }
}