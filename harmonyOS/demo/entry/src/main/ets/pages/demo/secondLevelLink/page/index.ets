import Constants from '../common/constants/Constants';
import ClassifyModel from '../viewmodel/ClassifyModel';
import CourseModel from '../viewmodel/CourseModel';
import CourseItem from '../view/courseItem';
import ClassifyItem from '../view/classifyItem';
import ClassifyViewModel from '../viewmodel/ClassifyViewModel';

@Entry
@Component
struct Index {
  @State currentClassify: number = 0;
  @State requestSuccess: boolean = false;
  private classifyList: Array<ClassifyModel> = [];
  private classifyScroller: Scroller = new Scroller();
  private scroller: Scroller = new Scroller();

  aboutToAppear() {
    setTimeout(() => {
      this.classifyList = ClassifyViewModel.getLinkData();
      this.requestSuccess = true;
    }, Constants.LOADING_DURATION);
  }

  @Builder ClassifyHeader(classifyName: string) {
    Row() {
      Text(classifyName)
        .fontSize(18)
        .fontColor('#182431')
        .fontFamily('HarmonyHeiTi-Medium')
        .fontWeight(Constants.TITLE_FONT_WEIGHT)
    }
    .padding({ left: 8 })
    .height(56)
    .width(Constants.FULL_PERCENT)
    .backgroundColor('#f1f3f5')
  }

  build() {
    Row() {
      if (this.requestSuccess) {
        List({ scroller: this.classifyScroller }) {
          ForEach(this.classifyList, (item: ClassifyModel, index?: number) => {
            ListItem() {
              ClassifyItem({
                classifyName: item.classifyName,
                isSelected: this.currentClassify === index,
                onClickAction: () => {
                  if (index !== undefined) {
                    this.classifyChangeAction(index, true);
                  }
                }
              })
            }
          }, (item: ClassifyModel) => item.classifyName + this.currentClassify)
        }
        .height(Constants.FULL_PERCENT)
        .width(100)
        .backgroundColor('#0D182431')
        .scrollBar(BarState.Off)

        List({ scroller: this.scroller }) {
          ForEach(this.classifyList, (classifyItem: ClassifyModel) => {
            ListItemGroup({
              header: this.ClassifyHeader(classifyItem.classifyName),
              space: Constants.COURSE_ITEM_PADDING
            }) {
              ForEach(classifyItem.courseList, (courseItem: CourseModel) => {
                ListItem() {
                  CourseItem({ itemStr: JSON.stringify(courseItem) })
                }
              }, (courseItem: CourseModel) => `${courseItem.courseId}`)
            }
          }, (item: ClassifyModel) => `${item.classifyId}}`)
        }
        .padding({left:8,right:12})
        .sticky(StickyStyle.Header)
        .layoutWeight(1)
        .edgeEffect(EdgeEffect.None)
        .onScrollIndex((start:number) => this.classifyChangeAction(start, false))
      } else {
        Text('加载中...')
          .fontFamily('HarmonyHeiTi-Medium')
          .textAlign(TextAlign.Center)
          .height(Constants.FULL_PERCENT)
          .width(Constants.FULL_PERCENT)
      }
    }
    .backgroundColor('#f1f3f5')
  }

  classifyChangeAction(index: number, isClassify: boolean) {
    if (this.currentClassify !== index) {
      // change the classify status.
      this.currentClassify = index;
      if (isClassify) {
        // scroll the course scroll.
        this.scroller.scrollToIndex(index);
      } else {
        // scroll the classify scroll.
        this.classifyScroller.scrollToIndex(index);
      }
    }
  }
}