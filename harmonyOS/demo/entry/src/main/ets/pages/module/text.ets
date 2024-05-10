@Entry
@Component
struct TextModule {
  private scroller: Scroller = new Scroller();

  build() {
    Scroll(this.scroller) {
      Column() {
        Column() {
          Text('我是一段文本')
        }

        Column() {
          Text($r('app.string.module_desc'))
            .baselineOffset(0)
            .fontSize(30)
            .border({ width: 1 })
            .padding(10)
            .width(300)
        }

        Column() {
          Text() {
            Span('我是Span1，').fontSize(16).fontColor(Color.Grey)
              .decoration({ type: TextDecorationType.LineThrough, color: Color.Red })
            Span('我是Span2').fontColor(Color.Blue).fontSize(16)
              .fontStyle(FontStyle.Italic)
              .decoration({ type: TextDecorationType.Underline, color: Color.Black })
            Span('，我是Span3').fontSize(16).fontColor(Color.Grey)
              .decoration({ type: TextDecorationType.Overline, color: Color.Green })
          }
          .borderWidth(1)
          .padding(10)
        }

        Column() {
          Text() {
            Span('I am Upper-span').fontSize(12)
              .textCase(TextCase.UpperCase)
          }
          .borderWidth(1)
          .padding(10)
        }

        Column() {
          Text('左对齐')
            .width(300)
            .textAlign(TextAlign.Start)
            .border({ width: 1 })
            .padding(10)
          Text('中间对齐')
            .width(300)
            .textAlign(TextAlign.Center)
            .border({ width: 1 })
            .padding(10)
          Text('右对齐')
            .width(300)
            .textAlign(TextAlign.End)
            .border({ width: 1 })
            .padding(10)
        }

        Column() {
          Text('This is the setting of textOverflow to Clip text content This is the setting of textOverflow to None text content. This is the setting of textOverflow to Clip text content This is the setting of textOverflow to None text content.')
            .width(250)
            .textOverflow({ overflow: TextOverflow.None })
            .maxLines(1)
            .fontSize(12)
            .border({ width: 1 })
            .padding(10)
          Text('我是超长文本，超出的部分显示省略号。I am an extra long text, with ellipses displayed for any excess。')
            .width(250)
            .textOverflow({ overflow: TextOverflow.Ellipsis })
            .maxLines(1)
            .fontSize(12)
            .border({ width: 1 })
            .padding(10)
        }

        Column() {
          Text('This is the text with the line height set. This is the text with the line height set.')
            .width(300).fontSize(12).border({ width: 1 }).padding(10)
          Text('This is the text with the line height set. This is the text with the line height set.')
            .width(300)
            .fontSize(12)
            .border({ width: 1 })
            .padding(10)
            .lineHeight(20)
        }

        Column() {
          Text('This is the text')
            .decoration({
              type: TextDecorationType.LineThrough,
              color: Color.Red
            })
            .borderWidth(1).padding(10).margin(5)
          Text('This is the text')
            .decoration({
              type: TextDecorationType.Overline,
              color: Color.Red
            })
            .borderWidth(1).padding(10).margin(5)
          Text('This is the text')
            .decoration({
              type: TextDecorationType.Underline,
              color: Color.Red
            })
            .borderWidth(1).padding(10).margin(5)
        }

        Column() {
          Text('This is the text content with baselineOffset 0.')
            .baselineOffset(0)
            .fontSize(12)
            .border({ width: 1 })
            .padding(10)
            .width('100%')
            .margin(5)
          Text('This is the text content with baselineOffset 30.')
            .baselineOffset(30)
            .fontSize(12)
            .border({ width: 1 })
            .padding(10)
            .width('100%')
            .margin(5)

          Text('This is the text content with baselineOffset -20.')
            .baselineOffset(-20)
            .fontSize(12)
            .border({ width: 1 })
            .padding(10)
            .width('100%')
            .margin(5)
        }

        Column() {
          Text('This is the text content with letterSpacing 0.')
            .letterSpacing(0)
            .fontSize(12)
            .border({ width: 1 })
            .padding(10)
            .width('100%')
            .margin(5)
          Text('This is the text content with letterSpacing 3.')
            .letterSpacing(3)
            .fontSize(12)
            .border({ width: 1 })
            .padding(10)
            .width('100%')
            .margin(5)
          Text('This is the text content with letterSpacing -1.')
            .letterSpacing(-1)
            .fontSize(12)
            .border({ width: 1 })
            .padding(10)
            .width('100%')
            .margin(5)
        }

        Column() {
          Text('我的最大字号为30，最小字号为15，宽度为250,高度为100')
            .width(250)
            .height(100)
            .maxFontSize(30)
            .minFontSize(15)
            .border({ width: 1 })
            .padding(10)
            .margin(5)
        }

        Column() {
          Text("这是一段可复制文本")
            .fontSize(30)
            .copyOption(CopyOptions.InApp)
        }
      }
      .padding(10)
    }

  }
}