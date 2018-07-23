/**
 * Created by He on 2018/7/22.
 * 首页的js
 */
var container = $('#content');

//初始化滑行动画
var swipe = swipe(container);

/**********动画处理***********/
var boy = boyWalk();//男孩走路

//开始
$('button:first').click(function () {
    //第一次走路
    boy.walkTo(2000, 0.2)
        .then(function () {
            //第一次完成
            boy.setColor('red');
            console.log('第1次完成:' + new Date());
        })
        //第二次走路
        .then(function () {
            return boy.walkTo(2000, 0.4);
        })
        .then(function () {
            //第二次完成
            boy.setColor('yellow');
            console.log('第2次完成:' + new Date());
        })
        //第三次走路
        .then(function () {
            return boy.walkTo(2000, 0.6);
        })
        .then(function () {
            //第三次完成
            boy.setColor('blue');
            console.log('第3次完成:' + new Date());
        });
});