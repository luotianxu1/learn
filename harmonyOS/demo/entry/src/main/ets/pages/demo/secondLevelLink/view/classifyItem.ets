import Constants from '../common/constants/Constants';

@Component
export default struct ClassifyItem {
  classifyName?:string;
  @Prop isSelected: boolean;
  onClickAction = () => {}

  build(){
    Text(this.classifyName)
      .fontSize(14)
      .fontColor(this.isSelected ? '#182431' : '#99182431')
      .fontFamily(this.isSelected ? 'HarmonyHeiTi-Medium' : 'HarmonyHeiTi')
      .fontWeight(this.isSelected ? Constants.TITLE_FONT_WEIGHT : Constants.LABEL_FONT_WEIGHT)
      .textAlign(TextAlign.Center)
      .backgroundColor(this.isSelected ? '#f1f3f5' : '')
      .width(Constants.FULL_PERCENT)
      .height(56)
      .onClick(this.onClickAction)
  }
}