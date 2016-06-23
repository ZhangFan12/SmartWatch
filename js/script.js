$(function (){
	RealTime();
	IconBtn($('.icon-btn'));
});
// $(window).resize(function(){
// });

//打开时间设置窗口
function setupTimeOpen(object){
	var strArrays = object.innerHTML.split(":");
	var hourValue = strArrays[0];
	var minuteValue = strArrays[1];

	var a = new setupTimeWindow();
	a.openWindow(24,60,hourValue,minuteValue);

	object.setAttribute("value","1");

	$(".time-alarm").animate({width:'69%'});
	$(".alarm-list").fadeOut();
};
//关闭时间设置窗口
function setupTimeClose(){
	var a = new setupTimeWindow();
	a.closeWindow();

	$(".time-alarm").animate({width:'73%'});
	$(".alarm-list").fadeIn();
};
//保存时间设置窗口
function setupTimeSave(){
	var a = new setupTimeWindow();

	$('<span class="time-btn" onclick="setupTimeOpen(this)" value="0">' + a.save() +'</span>').replaceAll($(".alarm-list .time-btn:eq(0)"));

	$(".time-alarm").animate({width:'73%'});
	$(".alarm-list").fadeIn();
};

//当前时间
var RealTime = function () {

	this.timeHtml = function() {
		var myDate = new Date();
		var timeValue = {
			hours: myDate.getHours(),
			minutes: myDate.getMinutes(),
			seconds: myDate.getSeconds(),
			angle: function() {
				return (this.seconds)/60*360;
			}
		}

		$("#real_time .icon").html(timeValue.hours + ":" + timeValue.minutes);
		this.angleLoop(timeValue.angle());
	}

	this.angleLoop = function(x) {
		// console.log(x);
		$("#real_time .bg").css("transform","rotate("+ x +"deg)");
		x = x + 0.25;
		if (x >= 360) {
			this.timeHtml();
			return;
		};
		setTimeout("this.angleLoop(" + x + ")", 1000/24)
	}

	this.timeHtml();
}


