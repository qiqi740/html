$(function(){
    $('.recruit-cont').each(function(){
		var _this = $(this);
		$(this).find('a.recruit-onoff').click(function () {
			$(this).toggleClass('active');
			if ( $(this).is(".active") ) {
				$(this).text("点击收缩");
			} else{
				$(this).text("点击展开");
			}
			_this.find('.detailed').slideToggle();
		})

		var par_nodes = _this.find('.text-top p');
		par_nodes.each(function(){
			var that = $(this);
			var str =  $.trim(that.find('span').text());
			if(str == null || str == '' || str == 'undefined') {
				that.addClass('hidden');
			}
		})
	});
})