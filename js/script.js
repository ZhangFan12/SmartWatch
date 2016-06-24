$(function (){
	RealTime();
	IconBtn($('.icon-btn'));
});
// $(window).resize(function(){
// });

//打开时间设置窗口
function setupTimeOpen(object){
	var timeArrays = object.innerHTML.split(':');
	var hourValue = timeArrays[0];
	var minuteValue = timeArrays[1];

	var a = new setupTimeWindow();
	a.openWindow(24,60,hourValue,minuteValue);//打开时间设置窗口

	object.setAttribute('value','1');

	$('.time-alarm').animate({width:'69%'});
	$('.alarm-list').fadeOut();
};
//关闭时间设置窗口
function setupTimeClose(){
	var a = new setupTimeWindow();
	var b = $('.time-btn');
	a.closeWindow();//关闭时间设置窗口

	b.eq(searchValue1(b)).attr('value','0');
	$('.time-alarm').animate({width:'73%'});
	$('.alarm-list').fadeIn();
};
//保存时间设置窗口
function setupTimeSave(){
	var a = new setupTimeWindow();
	var b = $('.time-btn');
	b.eq(searchValue1(b)).html(a.save());//保存时间设置窗口

	b.eq(searchValue1(b)).attr('value','0');
	$('.time-alarm').animate({width:'73%'});
	$('.alarm-list').fadeIn();

	var setTime = $('#real_time .icon:eq(0)').html().split(':');
	var angle = (parseInt(setTime[0]*60) + parseInt(setTime[1]))/720*360
	$('#real_time .bg').css('transform','rotate('+ angle +'deg)');
};
//查询value为1的标签，返回标签数组角标
function searchValue1(timeBtn){
	var x;
	$.each(timeBtn, function(i) {
		if (timeBtn.eq(i).attr('value') == '1') {
			x = i;
		}
	});
	// console.log(x);
	return x
}
//当前时间
var RealTime = function () {

	var myDate = new Date();
	var timeValue = {
		hours: myDate.getHours(),
		minutes: myDate.getMinutes(),
		angle: function() {
			return ((this.hours)*60 + this.minutes)/720*360;
		}
	}
	
	this.timeHtml = function(hours,minutes) {
		$('#real_time .icon').html(num2(hours) + ':' + num2(minutes));
	}

	this.angleLoop = function() {
		var setTime = $('#real_time .icon:eq(0)').html().split(':');
		var angle = (parseInt(setTime[0]*60) + parseInt(setTime[1]))/720*360
		$('#real_time .bg').css('transform','rotate('+ angle +'deg)');
	}

	this.timeHtml(timeValue.hours,timeValue.minutes);
	this.angleLoop();
}


