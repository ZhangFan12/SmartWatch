$(function (){
	RealTime();//获取系统时间显示
	alarmList();//判断是否显示列表
	if ($('.alarm-list').css('display') == 'block') {delAlarm('.alarm-list .time-btn')}//删除闹钟
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

		if ($('.content:eq(0)').css('background-color') != '#fff') {
			//还原背景颜色
			$('.content').css('background-color', '#fff');
		}
	});
}

//二级导航
function secondNav(object,topNum) {
	object.click(function() {
		active($(this));
		var num = $(this).index();
		$('.content:eq(' + topNum + ') .box-shell').css('display','none');
		$('.content:eq(' + topNum + ') .box-shell:eq(' + num + ')').css('display','block');
		//跌倒告警
		if ($('.content:eq(0)').css('background-color') != '#fff') {
			//还原背景颜色
			$('.content').css('background-color', '#fff');
		}
		if (topNum == 0 && num == 2) {
			//背景颜色设置
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

//重置按钮
function reset(object,value) {
	console.log(object.attr('value'));
	object.val(value);
}

//添加亲情号码&用户指纹
function addRightList(object) {

	var famliyNumValue = $('.famliy-num input').val();
	addFamliyNumHtml = '<dd>' +
		'<span>' + famliyNumValue + '</span>' +
		'<i class="icon iconfont">&#xe60b;</i>' +
		'<i class="icon iconfont" onclick="delRightList($(this),0)">&#xe601;</i>' +
	'</dd>';

	var fingerValue = $('.user-finger input').val();
	addFingerHtml = '<dd>' +
		'<img class="logo" src="images/user-finger-img1.png" alt=""> ' +
		'<span>' + fingerValue + '</span>' +
		'<i class="icon iconfont" onclick="delRightList($(this),1)">&#xe601;</i>' +
	'</dd>';

	var addList = object.parents('.box-shell').children('.right-list')

	if (object.parents('.famliy-num').length == 1) {
		//验证电话号码
		var x = new checkObject();
		if (x.checkMobile($('#check_phone')) == 0) {
			alert('电话号码格式错误')
			return
		}
		$('#check_phone').val("");//清空input值
		$(addFamliyNumHtml).appendTo(addList);//渲染
	    var length = $('.content:eq(1) .box-shell:eq(0) dd').length;
	    rightList(0,length);//判断右侧列表是否隐藏显示
	} else if (object.parents('.user-finger').length == 1) {
		$(addFingerHtml).appendTo(addList);//渲染
	    var length = $('.content:eq(1) .box-shell:eq(1) dd').length;
	    rightList(1,length);//判断右侧列表是否隐藏显示
	}
}
//修改亲情号码
function modifyRightList(object,num) {
	var mobileValue = object.prev().html();
	var addFamliyNumHtml = '<div class="famliy-num-modify" style="display:none">' +
			'<div class="title">修改亲情号码：</div>' +
			'<div class="body">' +
				'<label><i class="icon iconfont">&#xe608;</i></label>	' +
				'<input id="check_modify_phone" type="text" value="'+ mobileValue +'"></input>' +
				'<button><i class="icon iconfont" onclick="saveRightList($(this),0)">&#xe60b;</i></button>' +
			'</div>' +
		'</div>' ;

	$('.famliy-num').css('display', 'none');
	$('.right-list').animate({right:'71%'});
	$(addFamliyNumHtml).appendTo(object.parents('.box-shell'));
	setTimeout(function(){$('.famliy-num-modify').fadeIn();},400);
}
//保存已修改内容
function saveRightList(object,num) {
	this.anima = function(id,modifyId) {
		id.css('display', 'block');
		$('.right-list').animate({right:'0'});
		modifyId.remove();
	}
	if (num == 0) {
		//验证电话号码
		var x = new checkObject();
		if (x.checkMobile($('#check_modify_phone')) == 0) {
			alert('电话号码格式错误')
			return
		}
		this.anima($('.famliy-num'),$('.famliy-num-modify'));
	}
}
//删除亲情号码&用户指纹
function delRightList(object,num) {
	var r=confirm("确认删除用户指纹吗？");
	if (r==true){
	    object.parents('dd').remove();
	    var length = $('.content:eq(1) .box-shell:eq(' + num + ') dd').length;
	    rightList(num,length);
	}else{
		return
	}
}
//判断右侧列表是否隐藏显示
function rightList(num,value) {
	console.log(num + ',' + value)
	if (value == 0) {
		if (num == 0) {
			$('.right-list:eq(0)').fadeOut();
			$('.famliy-num').animate({width:'68%'});
		}else if (num == 1) {
			$('.right-list:eq(1)').fadeOut();
			$('.user-finger').animate({width:'93%'});
		}
	}else {
		if (num == 0) {
			$('.right-list:eq(0)').fadeIn();
			$('.famliy-num').animate({width:'40%'});
		}else if (num == 1) {
			$('.right-list:eq(1)').fadeIn();
			$('.user-finger').animate({width:'70%'});
		}
	}
}
//验证
var checkObject = function() {
    var regBox = {
        // regEmail : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,//邮箱
        // regName : /^[a-z0-9_-]{3,16}$/,//用户名
        regMobile : /^0?1[3|4|5|8][0-9]\d{8}$/,//手机
        // regTel : /^0[\d]{2,3}-[\d]{7,8}$/
    }
	this.checkMobile = function(id) {
    	var mflag = regBox.regMobile.test(id.val());
		if (!mflag) {return 0}else {return 1}//正确返回值1，错误返回值0
	}
}