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

/*灯动画*/
var lamp = {
    elem: $('.b_background'),
    bright: function () {
        this.elem.addClass('lamp-bright');
    },
    dark: function () {
        this.elem.removeClass('lamp-bright');
    }
};

/*
$('button:first').click(function () {
    //开门开灯
    openDoor().then(function () {
        lamp.bright();
    });
});

$('button:last').click(function () {
    //关门关灯
    closeDoor().then(function () {
        lamp.dark();
    });
});*/

var startRun = function startRun() {
    boy.walkTo(2000,0.5)
        .then(function () {
            //暂停走路
            boy.stopWalk();
        })
        .then(function () {
            //开门
            return openDoor();
        })
        .then(function () {
            //开灯
            lamp.bright();
        })
        .then(function () {
            //进商店
            return boy.toShop(2000);
        })
        .then(function () {
            //取花
            return boy.takeFlower();
        })
        .then(function () {
            //出商店
            return boy.outShop(2000);
        })
        .then(function () {
            //关门
            return closeDoor();
        })
        .then(function () {
            //关灯
            lamp.dark();
        });
};

$('button:first').click(startRun);



