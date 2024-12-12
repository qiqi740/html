var informtionShow = function ( obj ) {
	
	this.informtionShow = null,
	this.informtionShowIndex = null,
	this.information = null;
	
	this.init = function () {
		this.informtionShow = obj;
		this.information = obj.find('ul').html();
		obj.find('ul').append(this.information);
		var speed = 0,
			timer = null,
			onOff = true;
		
		function show() {
			if ( speed >= (obj.find('ul').height() - obj.height()) ) {
				speed = 0;
			}
			speed ++;
			obj.find('ul').css('top', -speed)
		}
		
		timer = setInterval(function () {
			show();
		},10);
		
		this.informtionShow.mousemove(function () {
			if ( onOff ) {
				clearInterval(timer);
				onOff = false;
			}
		})
		this.informtionShow.mouseleave(function () {
			if ( !onOff ) {
				timer = setInterval(function () {
					show();
				},10);
				onOff = true;
			}
		})
	}
}
$(function () {
	$('.sys_notice_02').each(function () {
		var temp = new informtionShow($(this));
        temp.init();
	});
})