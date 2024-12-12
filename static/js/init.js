var Init = {
	start:function(){
		var wow = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 0,
			mobile: true,
			live: true
		});
		wow.init();
		Init.initTab();
	},
	initTab:function(){
		$(".tab-list").each(function(index, element) {
			var p = $(this).parent();
            $(this).find(">li").each(function(i, element) {
				if(i==0){
					$(this).addClass("active");
				}else{
					$(this).removeClass("active");
				}
				$(this).click(function(e){
					console.log(i);
					var p = $(this).parent().parent();
					p.find(".tab-list>li").removeClass("active");
					p.find(".tab-content-box>div").removeClass("active");
					$(this).addClass("active");
					p.find(".tab-content-box>div").eq(i).addClass("active");
				});
			});
			p.find(".tab-content-box>div").each(function(i, element) {
				if(i==0){
					$(this).addClass("active");
				}else{
					$(this).removeClass("active");
				}
				$(this).children("div").addClass("Webpart").each(function(index, element) {
					if(typeof(Container) != "undefined"){
						Container.initWebpart($(this));
					}
				});
			});
        });
	}
}
$(function(){
	Init.start();
});