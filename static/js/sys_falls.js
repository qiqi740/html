var falls_show = function ( obj ) {
	
	this.init = function () {
		var margin = 0; // 这里设置间距
		var li = obj.find('li'); // 这里是区块名称
		var li_W = obj.find('li').eq(0).outerWidth() + 0; // 取区块的实际宽度（包含间距，这里使用源生的offsetWidth函数，不适用jQuery的width()函数是因为它不能取得实际宽度，例如元素内有pandding就不行了）
		var li_length = obj.find('li').length;
		
		function liuxiaofan() { //定义成函数便于调用
			li_W = obj.find('li').eq(0).outerWidth() + 0;
			var h = [], //记录区块高度的数组
				n = obj.width() / li_W | 0;	// 窗口的宽度除以区块宽度就是一行能放几个区块
			for(var i = 0; i < li_length; i++) { // 有多少个li就循环多少次
				li_H = li[i].offsetHeight; // 获取每个li的高度
				if(i < n) { // n是一行最多的li，所以小于n就是第一行了
					h[i] = li_H; // 把每个li放到数组里面
					li.eq(i).css("top", 0); // 第一行的Li的top值为0
					li.eq(i).css("left", i * li_W); // 第i个li的左坐标就是i*li的宽度
				} else {
					min_H = Math.min.apply(null, h); // 取得数组中的最小值，区块中高度值最小的那个
					minKey = getarraykey(h, min_H); // 最小的值对应的指针
					h[minKey] += li_H + margin; // 加上新高度后更新高度值
					li.eq(i).css("top", min_H + margin); // 先得到高度最小的Li，然后把接下来的li放到它的下面
					li.eq(i).css("left", minKey * li_W); // 第i个li的左坐标就是i*li的宽度
				}
			}
		}
		/* 使用for in运算返回数组中某一值的对应项数(比如算出最小的高度值是数组里面的第几个) */
		function getarraykey(s, v) {
			for(k in s) {
				if(s[k] == v) {
					return k;
				}
			}
		}
		
		function help_cont_height() {
			var aLenght = li_length,
				a = 0,
				b = 0,
				c = 0,
				max_num,li_height = 0,
				timer = null,
				ali = obj.find('li');
			
			ali.each(function (index , element) {
				li_height += $(this).height();
			})
			obj.height(li_height/2.8);
			timer =setTimeout(function () {
				a = parseInt(ali.eq(aLenght-1).height())+parseInt(ali.eq(aLenght-1).css('top'));
				b = parseInt(ali.eq(aLenght-2).height())+parseInt(ali.eq(aLenght-2).css('top'));
				c = parseInt(ali.eq(aLenght-3).height())+parseInt(ali.eq(aLenght-3).css('top'));
				max_num = (a > b)?a : b;
				li_height = (max_num > c)?max_num : c;
				obj.height(li_height+50);
				obj.find('ul').height(li_height+50);
			}, 500);
		}
		
		/*这里一定要用onload，因为图片不加载完就不知道高度值*/
		window.onload = function() {
			liuxiaofan();
			help_cont_height();
		};
		/*浏览器窗口改变时也运行函数*/
		window.onresize = function() {
			liuxiaofan();
			help_cont_height();
		};
	}
		
}

$(function () {
	var temp = new falls_show($('.sys_falls'));
    temp.init();
})
