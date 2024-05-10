import Constants from '../common/constants/Constants';
import CourseModel from '../viewmodel/CourseModel';

@Component
export default struct CourseItem {
  @Prop itemStr: string;
  item?: CourseModel;

  aboutToAppear() {
    this.item = JSON.parse(this.itemStr);
  }

  build() {
    Row() {
      Image(this.item !== undefined ? this.item?.imageUrl : '')
        .height(Constants.FULL_PERCENT)
        .aspectRatio(1)
      Column() {
        Text(this.item?.courseName)
          .fontSize(14)
          .fontColor('#182431')
          .fontFamily('HarmonyHeiTi-Medium')
          .maxLines(Constants.TITLE_LINE_NUMBER)
          .textOverflow({ overflow: TextOverflow.Clip })
          .lineHeight(20)
          .width(Constants.FULL_PERCENT)
        Text(this.item?.price === 0 ? '免费' : '¥' + this.item?.price)
          .fontSize(18)
          .fontColor('fa2a2d')
          .fontFamily('HarmonyHeiTi-Medium')
      }
      .padding(12)
      .layoutWeight(1)
      .alignItems(HorizontalAlign.Start)
      .justifyContent(FlexAlign.SpaceBetween)
      .height(Constants.FULL_PERCENT)
    }
    .clip(true)
    .borderRadius(18)
    .backgroundColor('#fff')
    .width('100%')
    .height(96)
  }
}