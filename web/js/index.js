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

var boy = boyWalk();//男孩走路
/**********分别为3个页面的动画处理***********/

/*第一个页面相关*/
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

/***第二个页面相关***/
// swipe.scrollTo(container.width(), 0);

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

/*飞鸟*/
var bird = {
    elem: $('.bird'),
    fly: function () {
        this.elem.addClass('birdFly');
        this.elem.transition({
            right: container.width()
        }, 15000,'linear');
    }
};


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
// swipe.scrollTo(visualWidth*2, 0);

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
// girl.setOffset();

//动画结束事件
var animationEnd = function () {
    var explorer = navigator.userAgent;
    if (~explorer.indexOf('WebKit')) {
        // Chrome, Safari 和 Opera
        return 'webkitAnimationEnd';
    }
    return 'animationEnd';
}();


//logo动画
var logo = {
    elem: $('.logo'),
    run: function () {
        this.elem.addClass('logoLightSpeedIn')
            .on(animationEnd, function () {
                //off() 方法通常用于移除通过 on() 方法添加的事件处理程序。
                $(this).addClass('logoShake').off();
            });
    }
};

/*飘花*/
var snowflakeURl = [
    'http://img.mukewang.com/55adde120001d34e00410041.png',
    'http://img.mukewang.com/55adde2a0001a91d00410041.png',
    'http://img.mukewang.com/55adde5500013b2500400041.png',
    'http://img.mukewang.com/55adde62000161c100410041.png',
    'http://img.mukewang.com/55adde7f0001433000410041.png',
    'http://img.mukewang.com/55addee7000117b500400041.png'
];

function snowFlake() {
    //飘花容器
    var flakeContainer = $('#snowflake');

    //随机6张图
    function getImagesName() {
        return snowflakeURl[Math.floor(Math.random()*6)];
    }

    //创建一个飘花元素
    function createSnowBox() {
        var url = getImagesName();
        return $('<div class="snowbox"/>').css({
            'width': 41,
            'height': 41,
            'position': 'absolute',
            'backgroundSize': 'cover',
            'zIndex': 1000,
            'top': '-41px',
            'backgroundImage': 'url(' +url + ')'
        }).addClass('snowRoll');
    }

    //开始飘花
    setInterval(function () {
        //运动轨迹
        var startPositionLeft = Math.random() * visualWidth - 100,
            startOpacity = 1,
            endPositionTop = visualHeight - 40,//减去花瓣的高度40
            endPositionLeft = startPositionLeft -100 + Math.random() * 500,
            duration = visualHeight * 10 +Math.random() * 5000;

        //随机透明度，不小于0.5
        var randomStart = Math.random();
        randomStart = randomStart < 0.5 ? startOpacity : randomStart;

        //创建一个飘花元素
        var flake = createSnowBox();

        //设计起点位置
        flake.css({
            left: startPositionLeft,
            opacity: randomStart
        });

        //加入到容器
        flakeContainer.append(flake);

        //开始执行动画
        flake.transition({
            top: endPositionTop,
            left: endPositionLeft,
            opacity: 0.7
        },duration,'ease-out',function () {
            $(this).remove();//结束后删除
        })
    }, 200);
}

/*背景音乐*/
var audioConfig = {
    enable: true,//是否开启音乐
    // playUrl: '../static/music/happy.wav', //错误的路径写法，相对于web/。。。才正确
    playUrl: 'static/music/happy.wav', // 正常播放地址
    cycleUrl: 'static/music/circulation.wav' // 正常循环播放地址
};

function html5Audio(url, isLoop) {
    var audio = new Audio(url);
    audio.autoplay = true;
    audio.loop = isLoop || false;
    audio.play();
    return {
        end: function (callBack) {
            audio.addEventListener('ended', function () {
                callBack();
            }, false);
        },
        pause:function () {
            audio.pause();
        }
    }
}

//男孩带花
// boy.setFlowerWalk();

//男孩走路
/*$('button:first').click(function () {
    //音乐响起
    var music = html5Audio(audioConfig.playUrl);
    music.end(function () {
        html5Audio(audioConfig.cycleUrl,true);
    });

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
       .then(function () {
           //延时转身
           setTimeout(function () {
              girl.rotate();
              boy.rotate(function () {
                  //回调函数
                  logo.run();
              });
           }, 1000);
       })
       .then(function () {
           //飘花
           snowFlake();
       })
});*/

/*整合3个部分的代码如下*/
$('button:first').click(function () {
    //音乐
    var music1 = html5Audio(audioConfig.playUrl);

    /*第1个页面部分*/
    //太阳公转
    $("#sun").addClass('rotation');

    //云飘
    $('.cloud:first').addClass('cloud1Anim');
    $('.cloud:last').addClass('cloud2Anim');

    //第一次走路
    boy.walkTo(2000, 0.2)
        .then(function () {
            //第一次完成，页面开始慢慢滚动到第2页面
            scrollTo(5000, 1);
        })
        //第二次走路
        .then(function () {
            return boy.walkTo(4000, 0.4);
        })
        /*第2个页面部分*/
        .then(function () {
           return boy.walkTo(3000, 0.5);
        })
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
            //先停止走路
            boy.stopWalk();
            //关门
            closeDoor();
            //关灯
            lamp.dark();
            //这一段不使用return，使下面代码同步执行
        })
        .then(function () {
            //开始慢慢滚动到第3页面
            scrollTo(5000, 2);
            //在页面滚动同时，再走一段路，然后才进入第3页面
            return boy.walkTo(2000,0.3);
        })
        /*第3页面相关*/
        .then(function () {
            //男孩带花
            boy.setFlowerWalk();
            girl.setOffset();
        })
        //正式走入第3页面
        .then(function () {
            return boy.walkTo(2000,0.15)
        })
        .then(function () {
            //第二段路，走到桥上
            return boy.walkTo(2000, 0.25,
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
        .then(function () {
            //延时转身
            setTimeout(function () {
                girl.rotate();
                boy.rotate(function () {
                    //回调函数
                    logo.run();
                });
            }, 1000);
            //停背景音乐1，开2
            music1.pause();
            html5Audio(audioConfig.cycleUrl,true);
        })
        .then(function () {
            //飘花
            snowFlake();
        })
});

