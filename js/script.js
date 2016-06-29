$(function (){
	RealTime();//获取系统时间显示
	IconBtn($('.icon-btn'));//IconBtn按钮
	alarmList();//判断是否已有闹钟
	delAlarm();//闹钟删除
});
