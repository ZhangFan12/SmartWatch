$(function (){
	RealTime();//获取系统时间显示
	alarmList();//判断是否已有闹钟
	delAlarm('.alarm-list .time-btn');//删除闹钟
	weekNavActive($('.week-nav li'));//week-nav点击高亮

	//初始化顶级导航和二级导航
	topNav($('.top-nav li'))
	$('.aside-nav:eq(0)').css('display', 'block');
	$('.content:eq(0)').css('display', 'block');
	secondNav($('.aside-nav:eq(0) li'),0);
	$('.content:eq(0) .box-shell:eq(0)').css('display','block');

});

//顶级导航
function topNav(object) {
	object.click(function() {
		active($(this));
		var num = $(this).index();
		$('.content').css('display','none');
		$('.content:eq(' + num + ')').css('display','block');
		$('.aside-nav').css('display','none');
		$('.aside-nav:eq(' + num + ')').css('display','block');
		//初始化二级导航
		secondNav($('.aside-nav:eq(' + num + ') li'),num);
		$('.aside-nav:eq(' + num + ') li').removeClass('active');
		$('.aside-nav:eq(' + num + ') li:eq(0)').addClass('active');
		$('.content:eq(' + num + ') .box-shell').css('display','none');
		$('.content:eq(' + num + ') .box-shell:eq(0)').css('display','block');
	});
}

//二级导航
function secondNav(object,topNum) {
	object.click(function() {
		active($(this));
		var num = $(this).index();
		$('.content:eq(' + topNum + ') .box-shell').css('display','none');
		$('.content:eq(' + topNum + ') .box-shell:eq(' + num + ')').css('display','block');
		if ($('.content:eq(0)').css('background-color') != '#fff') {
			$('.content').css('background-color', '#fff');
		}
		//跌倒告警背景颜色
		if (num == 3) {
			$('.content:eq(0)').css('background-color', '#21282b')
		}
	});
}

//导航栏高亮显示
function active(object) {
	object.siblings().removeClass('active')
	if (object.attr('class') != 'active') {
		object.addClass('active')
	}
}

//weekNav高亮显示
function weekNavActive(object) {
	object.click(function() {
		if ($(this).attr('class') == 'active') {
			$(this).removeClass('active')
		}else {
			$(this).addClass('active')
		}
	});
}