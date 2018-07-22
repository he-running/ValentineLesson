/**
 * Created by He on 2018/7/22.
 * 滑动对象封装，对外暴露了scrollTo接口
 */
function swipe(container) {
    //滑动对象
    var swipe = {};

    //第一个子节点
    var element = container.find(':first');

    //li页面数量
    var slides = element.find('li');

    //获取容器尺寸
    var width = container.width();
    var height = container.height();

    //设置li页面总宽度
    element.css({
        width: (slides.length * width) + 'px',
        height: height + 'px'
    });
    //设置每个页面li的宽度
    $.each(slides, function (index) {
        var slide = slides.eq(index);//获取每一个li元素
        slide.css({
            width: width + 'px',
            height: height + 'px'
        });
    });

    //监控完成与移动
    swipe.scrollTo = function (x, speed) {
        //执行动画移动
        element.css({
            '-webkit-transition-timing-function': 'linear',
            '-moz-transition-timing-function': 'linear',
            '-ms-transition-timing-function': 'linear',
            '-o-transition-timing-function': 'linear',
            'transition-timing-function': 'linear',

            '-webkit-transition-duration': speed + 'ms',
            '-moz-transition-duration': speed + 'ms',
            '-ms-transition-duration': speed + 'ms',
            '-o-transition-duration': speed + 'ms',
            'transition-duration': speed + 'ms',

            '-webkit-transform': 'translate3d(-' + x + 'px,0px,0px)',
            '-moz-transform': 'translate3d(-' + x + 'px,0px,0px)',
            '-ms-transform': 'translate3d(-' + x + 'px,0px,0px)',
            '-o-transform': 'translate3d(-' + x + 'px,0px,0px)',
            'transform': 'translate3d(-' + x + 'px,0px,0px)'
        });
        return this;
    };

    return swipe;
}