/**
 * Created by He on 2018/7/22.
 */
var swipe = swipe($('#content'));

//获取数据
var getValue = function (className) {
    var $elem = $('' + className + '');
    // 走路的路线坐标
    return {
        height: $elem.height(),
        top: $elem.position().top
    };
};

//路的Y轴
var pathY = function () {
    var data = getValue('.a_background_middle');
    return data.top + data.height / 2;
}();

var $boy = $("#boy");
var boyHeight = $boy.height();

// 修正小男孩的正确位置
// 路的中间位置减去小孩的高度，25是一个修正值
$boy.css({
    top: pathY - boyHeight + 25
});

/*添加精灵动画*/
// $('button').click(function () {
//     // 增加走路的CSS3关键帧规则
//     $boy.addClass('slowWalk');
// });

/*结合精灵动画和transition可以实现走路动态
*通过引入jquery.transit的封装实现transition渐变的方式让人物走动*/
$('button').click(function () {
   $boy.transition({
       'left':$('#content').width() + 'px'
   },10000,'linear',function () {});
});


