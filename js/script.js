$(function (){
	RealTime();//获取系统时间显示
	alarmList();//判断是否已有闹钟
	delAlarm('.alarm-list .time-btn');//删除闹钟
});
