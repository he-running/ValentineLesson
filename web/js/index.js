/**
 * Created by He on 2018/7/22.
 * 首页的js
 */
var container = $('#content');

//初始化滑行动画
var swipe = swipeAnim(container);

// 页面滚动到指定的位置
function scrollTo(time, proportion) {
    var distX = container.width() * proportion;
    swipe.scrollTo(distX, time);
}


/**********动画处理***********/
swipe.scrollTo(container.width(),0);

var boy = boyWalk();//男孩走路

//开始
/*
$('button:first').click(function () {

    //太阳公转
    $("#sun").addClass('rotation');

    //云飘
    $('.cloud:first').addClass('cloud1Anim');
    $('.cloud:last').addClass('cloud2Anim');

    //第一次走路
    boy.walkTo(2000, 0.2)
        .then(function () {
            //第一次完成
            boy.setColor('red');
            console.log('第1次完成:' + new Date());
            scrollTo(5000, 1);
        })
        //第二次走路
        .then(function () {
            return boy.walkTo(4000, 0.4);
        })
        .then(function () {
            //第二次完成
            boy.setColor('yellow');
            console.log('第2次完成:' + new Date());
        });
        // //第三次走路
        // .then(function () {
        //     return boy.walkTo(2000, 0.6);
        // })
        // .then(function () {
        //     //第三次完成
        //     boy.setColor('blue');
        //     console.log('第3次完成:' + new Date());
        // });
});*/

/*商店门动画*/
function doorAction(left, right, time) {
    var door = $('.door');
    var doorLeft = $('.door-left');
    var doorRight = $('.door-right');
    var defer = $.Deferred();
    var count = 2;
    //等待开门完成
    var complete = function () {
        if (count == 1) {
            console.log('complete: '+count);
            defer.resolve();
            return;
        }
        console.log('disComplete: '+count);
        count--;
    };

    doorLeft.transition({
        'left': left
    }, time, complete);

    doorRight.transition({
        'left': right
    }, time, complete);

    return defer;
}

//开门
function openDoor() {
    return doorAction('-50%', '100%', 2000);
}

//关门
function closeDoor() {
    return doorAction('0%', '50%', 2000);
}

$('button:first').click(function () {
    openDoor();
});

$('button:last').click(function () {
    closeDoor();
});
