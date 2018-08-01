/**
 * Created by He on 2018/7/22.
 * 首页的js
 */
var container = $('#content');

//初始化滑行动画
var swipe = swipeAnim(container);

var visualWidth = container.width();
var visualHeight = container.height();

// 页面滚动到指定的位置
function scrollTo(time, proportion) {
    var distX = visualWidth * proportion;
    swipe.scrollTo(distX, time);
}


/**********动画处理***********/
// swipe.scrollTo(container.width(), 0);

var boy = boyWalk();//男孩走路

/***第二个页面相关***/
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
/*function doorAction(left, right, time) {
    var door = $('.door');
    var doorLeft = $('.door-left');
    var doorRight = $('.door-right');
    var defer = $.Deferred();
    var count = 2;
    //等待开门完成
    var complete = function () {
        if (count == 1) {
            console.log('complete: ' + count);
            defer.resolve();
            return;
        }
        console.log('disComplete: ' + count);
        count--;
    };

    doorLeft.transition({
        'left': left
    }, time, complete);

    doorRight.transition({
        'left': right
    }, time, complete);

    return defer;
}*/

//开门
/*function openDoor() {
    return doorAction('-50%', '100%', 2000);
}*/

//关门
/*function closeDoor() {
    return doorAction('0%', '50%', 2000);
}*/

/*灯动画*/
/*var lamp = {
    elem: $('.b_background'),
    bright: function () {
        this.elem.addClass('lamp-bright');
    },
    dark: function () {
        this.elem.removeClass('lamp-bright');
    }
};*/

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

/*飞鸟*/
/*var bird = {
    elem: $('.bird'),
    fly: function () {
        this.elem.addClass('birdFly');
        this.elem.transition({
            right: container.width()
        }, 15000,'linear');
    }
};*/


/*var startRun = function startRun() {
    boy.walkTo(2000, 0.5)
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
            //飞鸟
            bird.fly();
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
};*/

/***第三页面***/
//获取数据
var getValue = function (className) {
    var elem = $(''+className+'');
    //走路的路线坐标
    return {
        height: elem.height(),
        top: elem.position().top
    };
};

//桥的Y轴
var bridgeY = function () {
    var data = getValue('.c_background_middle');
    return data.top;
}();

//移动到第三页面
swipe.scrollTo(visualWidth*2, 0);

//女孩
var girl = {
    elem: $('.girl'),
    getHeight: function () {
        return this.elem.height();
    },
    setOffset: function () {
        this.elem.css({
            left: visualWidth/2,
            top:bridgeY-this.getHeight()
        })
    },
    //转身动作
    rotate: function () {
        this.elem.addClass('girl-rotate');
    },
    getOffset: function () {
        return this.elem.offset();
    },
    getWidth: function () {
        return this.elem.width();
    }
};

//修正女孩位置
girl.setOffset();

//男孩带花
boy.setFlowerWalk();

//男孩走路
$('button:first').click(function () {
    //第一段路，走到桥底
   boy.walkTo(2000,0.15)
       .then(function () {
           //第二段路，走到桥上
           return boy.walkTo(1500, 0.25,
               (bridgeY-girl.getHeight())/visualHeight);
       })
       .then(function () {
           //走近女生
           var girlLeft = girl.getOffset().left;
           var boyWidth = boy.getWidth();
           var girlWidthPercent = girl.getWidth()/5;
           var proportionX = (girlLeft - boyWidth
            + girlWidthPercent)/visualWidth;

           return boy.walkTo(1500,proportionX);
       })
       .then(function () {
           //已走到面前,还原走路状态
           boy.resetOrigin();
       })
});
