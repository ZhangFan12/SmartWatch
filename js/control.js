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
		var a = $('#control-setup-time li').height();
		$('#control-setup-time li').css('line-height', a + 'px')

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
		var h = parseInt($('#hour_move').css('top'));
		var m = parseInt($('#minute_move').css('top'));
		var timeValue = function(x) {
			var y = -x/50+3;
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

			var liHeight = id.find('li').outerHeight(true);

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
					console.log('超出最小值');
				} else if (moveValue <= topValueArray[num-1] + liHeight/2) {
					$(id).css('top',topValueArray[num-1] + 'px');
					moveValue = topValueArray[num-1];
					id.find('li').eq(num-1).addClass('active');
					console.log('超出最大值');
				}
			});
			// console.log(moveValue)
		});
	}

	//生成top值数组
	var topValue = function(id,num) {
		num = num - 1;
		var liHeight = id.find('li').outerHeight(true);
		var topArray = new Array();
		for (var i = 0; i <= num; i++) {
			x = i - 2;
			topArray[i]= -liHeight * x;
		}
		// console.log(topArray);
		return topArray //返回top值数组
	}
};

//icon-btn按钮
var IconBtn = function(object) {
	object.html('<span></span><i></i>');
	object.each(function() {
		if ($(this).attr('value') == '0') {
			$(this).find('span').css({'background-color': '#eaeaea'});
			$(this).find('i').css({'right':'36px'});
		}
	});
	object.click(function() {
		if ($(this).attr('value') == '1') {
			$(this).attr('value','0');
			$(this).find('span').css({
				'animation': 'icon-btn-off 0.5s',
				'background-color': '#eaeaea'
			});
			$(this).find('i').animate({right:'36px'},'fast');
		} else if($(this).attr('value') == '0') {
			$(this).attr('value','1');
			$(this).find('span').css({
				'animation': 'icon-btn-on 0.5s',
				'background-color': '#f39c12'
			});
			$(this).find('i').animate({right:'0'},'fast');
		}
	});
}

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