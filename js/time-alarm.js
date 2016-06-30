//获取系统时间显示
function RealTime() {

	var myDate = new Date();
	var timeValue = {
		hours: myDate.getHours(),
		minutes: myDate.getMinutes(),
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

//判断是否已有闹钟
function alarmList() {
	if ($('.alarm-list li').length == 0) {
		$('.time-alarm').animate({width:'100%'});
		$('.alarm-list').fadeOut();
	}else {
		$('.time-alarm').animate({width:'73%'});
		$('.alarm-list').fadeIn();
	}
}

//闹钟添加
function addAlarm() {
	var x = $('#alarm_value').html();
	var num = $('.alarm-list li').length;
	var addAlarmHtml = '<li>' +
			'<span class="title">闹钟' + (num + 1) + '</span>' +
			'<span class="state">自定义</span>' +
			'<span class="time-btn" onclick="setupTimeOpen(this)" value="0">' + x +'</span>' +
			'<span class="icon-btn" onclick="IconBtnClick(this)" value="1"></span>' +
		'</li>';
	$(addAlarmHtml).appendTo('.alarm-list');

	IconBtn($('.icon-btn'));//初始化闹钟开关
	alarmList();//判断是否已有闹钟
	delAlarm($('.alarm-list .time-btn:eq(' + num + ')'));
}
//删除闹钟
function delAlarm(id) {
	touch.on(id, 'hold', function(ev){
		var r=confirm("确认删除闹钟吗？");
		if (r==true){
			console.log(this);
		    this.parentNode.setAttribute('name','delete');
		    $('.alarm-list li[name="delete"]').remove();
			alarmList();
		}else{
		    this.parentNode.removeAttribute("name");
		}
	});
}

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
	if ($('.alarm-list li').length == 0) {
		$('.time-alarm').animate({width:'100%'});
	}else {
		$('.time-alarm').animate({width:'73%'});
		$('.alarm-list').fadeIn();
	}
};

//保存时间设置窗口
function setupTimeSave(){
	var a = new setupTimeWindow();
	var b = $('.time-btn');
	b.eq(searchValue1(b)).html(a.save());//保存时间设置窗口

	b.eq(searchValue1(b)).attr('value','0');
	if ($('.alarm-list li').length == 0) {
		$('.time-alarm').animate({width:'100%'});
	}else {
		$('.time-alarm').animate({width:'73%'});
		$('.alarm-list').fadeIn();
	}

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



//设置时间窗口
var setupTimeWindow = function(){
	var liHeight;
	//打开窗口
	this.openWindow = function(hoursNum,minutesNum,hourValue,minuteValue){

		var hoursHtml = ''
;
		for (var i = 1; i <= hoursNum; i++) {
			hoursHtml = hoursHtml + '<li>' + num2(i) + '<span>时</span></li>';
		};

		var minutesHtml = '';
		for (var i = 0; i <= minutesNum-1; i++) {
			minutesHtml = minutesHtml + '<li>' + num2(i) + '<span>分</span></li>';
		};

		var windowHtml = '<div id="setup-time-window">' +
			'<div class="setup-header">' +
				'<div class="left-btn" onclick="setupTimeClose()"><i class="iconfont">&#xe610;</i></div>' +
				'<div class="title">设置时间</div>' +
				'<div class="right-btn" onclick="setupTimeSave()"><i class="iconfont">&#xe60f;</i></div>' +
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

		//窗口渲染
		$('.content').append(windowHtml);
		$('#setup-time-window').fadeIn();


		//设置时间的li高度自适应
		liHeight = $('#setup-time-window li').height();
		$('#setup-time-window li').css({
			'line-height': liHeight + 'px',
			'height': liHeight + 'px'
		})

		//加载初始时间
		var hourMoveValue = this.iniTimeDisplay($('#hour_move'),hoursNum,hourValue);
		var minuteMoveValue = this.iniTimeDisplay($('#minute_move'),minutesNum,parseInt(minuteValue)+1);

		//加载时间滑动效果
		this.setupTime($('#hour_move'),hoursNum,hourMoveValue);
		this.setupTime($('#minute_move'),minutesNum,minuteMoveValue);
	}

	//关闭窗口
	this.closeWindow = function() {
		$('#setup-time-window').remove();
	}

	//修改后保存
	this.save = function() {
		var liHeight = $('#setup-time-window li').height();
		var h = parseInt($('#hour_move').css('top'));
		var m = parseInt($('#minute_move').css('top'));
		var timeValue = function(x) {
			var y = -x/liHeight+3;
			return y
		}
		var text = num2(timeValue(h)) + ':' + num2((timeValue(m)-1));//取2位整数

		$('#setup-time-window').remove();
		return text
	}

	//弹窗初始时间显示
	this.iniTimeDisplay = function(id,num,Value) {
		var topValueArray = topValue(id,num);//获取top值数组

		id.css('top',topValueArray[Value - 1] + 'px');
		id.find('li').eq(Value - 1).addClass('active');

		return topValueArray[Value - 1]//返回top值
	}

	//时间设置滑动效果
	this.setupTime = function (id,num,moveValue) {
		//滑动时
		touch.on(id, 'swiping', function(ev){
			var totalMoveValue = moveValue + ev.distanceY;
			id.css('top',totalMoveValue + 'px');
			id.find('li').removeClass('active');
		});
		//滑动结束
		touch.on(id, 'swipeend', function(ev){
			moveValue = moveValue + ev.distanceY;

			var topValueArray = topValue(id,num);//获取top值数组

			$.each(topValueArray, function(i){
				if (moveValue > topValueArray[i+1] + liHeight/2 && moveValue <= topValueArray[i] + liHeight/2) {
					$(id).css('top',topValueArray[i] + 'px');
					moveValue = topValueArray[i];
					id.find('li').eq(i).addClass('active');
				} else if (moveValue > topValueArray[0] + liHeight/2) {
					$(id).css('top',topValueArray[0] + 'px');
					moveValue = topValueArray[0];
					id.find('li').eq(0).addClass('active');
					// console.log('超出最小值');
				} else if (moveValue <= topValueArray[num-1] + liHeight/2) {
					$(id).css('top',topValueArray[num-1] + 'px');
					moveValue = topValueArray[num-1];
					id.find('li').eq(num-1).addClass('active');
					// console.log('超出最大值');
				}
			});
			// console.log(moveValue)
		});
	}

	//生成top值数组
	var topValue = function(id,num) {
		num = num - 1;
		var topArray = new Array();
		for (var i = 0; i <= num; i++) {
			x = i - 2;
			topArray[i]= -liHeight * x;
		}
		// console.log(topArray);
		return topArray //返回top值数组
	}
};

//取2位整数
function num2(Value) {
	if (Value.toString().length == 1) {
		Value = '0' + Value;
		return Value;
	}else {
		Value = '' + Value;
		return Value;
	}
}

//icon-btn按钮初始化
function IconBtn(object) {
	object.html('<span></span><i></i>');
	object.each(function() {
		if ($(this).attr('value') == '0') {
			$(this).find('span').css({'background-color': '#eaeaea'});
			$(this).find('i').css({'right':'36px'});
		}
	});
}
//icon-btn按钮点击切换
function IconBtnClick(object) {
	if ($(object).attr('value') == '1') {
		$(object).attr('value','0');
		$(object).find('span').css({
			'animation': 'icon-btn-off 0.5s',
			'background-color': '#eaeaea'
		});
		$(object).find('i').animate({right:'36px'},'fast');
	} else if($(object).attr('value') == '0') {
		$(object).attr('value','1');
		$(object).find('span').css({
			'animation': 'icon-btn-on 0.5s',
			'background-color': '#f39c12'
		});
		$(object).find('i').animate({right:'0'},'fast');
	}
}
