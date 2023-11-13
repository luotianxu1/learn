function loader(source) {
    console.log('pre2')
    //console.log(source);//loader里拿 到的source一般默认是字符串
    //加载一些图片 字体
    return source + '//pre2'
}
loader.pitch = function () {
    console.log('pre2-pitch')
}
module.exports = loader
