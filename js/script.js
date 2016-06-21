$(function (){
	// RealTime();
});
// $(window).resize(function(){
// });

function setupTimeOpen(){
	var a = new setupTimeWindow();
	a.openWindow(24,60);
};
function setupTimeClose(){
	var a = new setupTimeWindow();
	a.closeWindow(24,60);
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

		$("#real_time i").html(timeValue.hours + ":" + timeValue.minutes);
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

//设置时间窗口
var setupTimeWindow = function(){
	//打开窗口
	this.openWindow = function(hoursNum,minutesNum){
		$(".time-alarm").animate({width:'62%'});

		var hoursHtml = "";
		for (var i = 1; i <= hoursNum; i++) {
			hoursHtml = hoursHtml + "<li>" + i + "<span>时</span></li>";
		};

		var minutesHtml = "";
		for (var i = 1; i <= minutesNum; i++) {
			minutesHtml = minutesHtml + "<li>" + i + "<span>分</span></li>";
		};

		var windowHtml = '<div class="setup-time-window">' +
			'<div class="setup-header">' +
				'<div class="left-btn" onclick="setupTimeClose()"><i class="iconfont">&#xe610;</i></div>' +
				'<div class="title">设置时间</div>' +
				'<div class="right-btn"><i class="iconfont">&#xe60f;</i></div>' +
			'</div>' +
			'<div class="setup-body">' +
				'<div class="control-setup-time">' +
					'<ul id="hour_move" class="hour clearfix">' +
						hoursHtml +
					'</ul>' +
					'<ul id="minute_move" class="minute clearfix">' +
						minutesHtml +
					'</ul>' +
					'<div class="active-bg"></div>' +
				'</div>' +
			'</div>' +
		'</div>';

		$(".content").append(windowHtml);
		$(".setup-time-window").fadeIn();

		//设置时间的li高度自适应
		var a = $(".control-setup-time li").height();
		$(".control-setup-time li").css("line-height", a + "px")

		setupTime($("#hour_move"),hoursNum);
		setupTime($("#minute_move"),minutesNum);
		console.log(hoursHtml);
	}
	//关闭窗口
	this.closeWindow = function() {
		$(".time-alarm").animate({width:'100%'});

		$(".setup-time-window").remove();
	}
};

//时间设置滑动效果
function setupTime(id,num) {
	num = num-1;
	var moveValue = 0;

	touch.on(id, 'swiping', function(ev){
		var totalMoveValue = moveValue + ev.distanceY;
		this.parentNode.style.top = totalMoveValue + 'px';
		
		id.find("li").removeClass('active');
	});

	touch.on(id, 'swipeend', function(ev){
		moveValue = moveValue + ev.distanceY;

		var liHeight = id.find("li").outerHeight(true);
		var hoursValue = new Array();
		for (var i = 0; i <= num; i++) {
			x = i - 2;
			hoursValue[i]= -liHeight * x;
		}
		$.each(hoursValue, function(i){
			if (moveValue > hoursValue[i+1] + liHeight/2 && moveValue < hoursValue[i] + liHeight/2) {
				$(id).css("top",hoursValue[i] + "px");
				moveValue = hoursValue[i];
				id.find("li").eq(i).addClass('active');
			} else if (moveValue >= hoursValue[0] + liHeight/2) {
				$(id).css("top",hoursValue[0] + "px");
				moveValue = hoursValue[0];
				id.find("li").eq(0).addClass('active');
			} else if (moveValue <= hoursValue[num] + liHeight/2) {
				$(id).css("top",hoursValue[num] + "px");
				moveValue = hoursValue[num];
				id.find("li").eq(num).addClass('active');
			}
		});
		// console.log(hoursValue)
	});
}


