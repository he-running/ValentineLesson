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
// $('button').click(function () {
//    $boy.transition({
//        'left':$('#content').width() + 'px'
//    },10000,'linear',function () {});
// });

/*添加暂停功能*/
$('button:first').click(function () {
    $boy.addClass('slowWalk').transition({
        'left':$('#content').width() + 'px'
    },10000);
});
//暂停
$('button:nth-child(2)').click(function () {
    // 强制做了一个改变目标left的处理
    // 动画是要运行10秒,所以此时动画还是没有结束的
    var currentLeft = $boy.css('left');
    $boy.css('left',currentLeft);
    $boy.removeClass('recoverWalk');
    $boy.addClass('pauseWalk');
});

//恢复
$('button:last').click(function () {
    $boy.removeClass('pauseWalk');
    $boy.addClass('slowWalk').transition({
        'left':$('#content').width() + 'px'
    },10000);
    $boy.addClass('recoverWalk');
});