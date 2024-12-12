var Nav = {
	init:function(div){
		div.find("ul.nav>li").hover(function(e){
			//var top = $(this).offset().top + $(this).outerHeight();
			//var left = $(this).offset().left();
			//$("body").append($(this).find(">ul"));
			//$("body").css({top:top+"px", left:left+"px"});
			$(this).find(">ul").stop().slideDown(500);
			div.find(".row,.row-fluid").resizable("disable");
			e.stopPropagation();
		},function(e){
			$(this).find(">ul").stop().slideUp(200);
			div.find(".row,.row-fluid").resizable("enable");
		});
		div.find("ul.nav>li>ul").hover(function(e){
			div.find(".row,.row-fluid").resizable("disable");
			$(this).parent().addClass("active");
			e.stopPropagation();
		},function(e){
			div.find(".row,.row-fluid").resizable("enable");
			$(this).parent().removeClass("active");
		});
		div.find("ul.nav>li>ul>li").hover(function(e){
			$(this).find(">ul").stop().slideDown(500);
			e.stopPropagation();
		},function(e){
			$(this).find(">ul").stop().slideUp(200);
		});
		div.find("ul.nav>li>ul>li>ul").hover(function(e){
			$(this).parent().addClass("active");
			e.stopPropagation();
		},function(e){
			$(this).parent().removeClass("active");
		});
	}
}
$(function(){
	Nav.init($('body'));
});