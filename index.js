var getList = []; // 抽取的号码
var sum; // 总人数
var num; // 抽查的人数
var iptSum = $('#sum')[0]; // 总人数输入框
var iptNum = $('#num')[0]; // 抽查人数输入框
var admin = ['幻影', '蚂蚁', '基恒', '老铁', '卡兹', '乔丹', '向北', '辰', '阿诚'];

var startDate = new Date('Mar 17 2018 00:00:00 GMT+0800').getTime(); // 卡兹
var thatDate = new Date().getTime();

// 目标人物 
var target = admin[datedifference(startDate, thatDate) % admin.length];
var nextTarget = admin[(datedifference(startDate, thatDate) + 1) % admin.length];
// 日期
var today = getNowFormatDate('today');
var tomorrow = getNowFormatDate('tomorrow');
var time;

$('.title .today i').text(today);
$('.title .today span').text(target);
$('.tomorrow i').text(tomorrow);
$('.tomorrow span').text(nextTarget);

$('#btn').click(function () {
	clearTimeout(time);
	getList = [];
	var content = $('.content').html('');
	if (iptSum.value) {
		sum = +iptSum.value;
		if (sum > 100) {
			alert('总人数不大于100啊，撒比！！！');
			return;
		}
	} else {
		alert('输入总人数啊，撒比！！！');
		return;
	}
	if (iptNum.value) {
		num = +iptNum.value;
		if (num >= sum) {
			alert('抽查人数不大于总人数啊，撒比，疯了吧你！！！');
			return;
		}
	} else {
		alert('输入抽查人数啊，撒比！！！')
	}
	for (var i = 0; i < num; i++) {
		var temp = getRandom(sum);
		if (getList.some(function (element, index, array) {
				return element === temp;
			})) {
			i--;
		} else {
			getList.push(temp);
		}
	}
	getList.sort(function (a, b) {
		return a - b;
	})
	$(".box h3").html(`今日<span style="color:red;font-size:24px">${num}</span>位倒霉蛋`);
	var per = 0; // 记循环次数		
	time = setInterval(function() {
		content.append(`<div class="every">${getList[per]}</div>`);
		if(per >= getList.length-1){
			clearInterval(time);
		}else{
			per++;
		}
	},100);
})

function getRandom(sum) {
	return Math.ceil(Math.random() * sum);
}
function datedifference(sstartDate, sthatDate) {
	var dateSpan;
	dateSpan = sthatDate - sstartDate;
	return Math.floor(dateSpan / (24 * 3600 * 1000));
};
function getNowFormatDate(message) {
	var date = new Date();
	if (message == 'tomorrow') {
		date.setTime(date.getTime()+24*60*60*1000);
	}
	
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}