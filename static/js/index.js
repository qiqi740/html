$(function(){

    //导航菜单
    var nav = $('.nav');
    nav.each(function(){
        var self = $(this);

        var level1 = self.find('> ul >li');
        var _this,
            ulLevel,
            SPEED = 300,
            ulLevel2;

        level1.hover(function(){
            _this = $(this);
            ulLevel = _this.find('>ul');
            ulLevel.stop(true).slideToggle(SPEED);

            ulLevel2 = _this.find('>ul >li >ul')
        })

        var liLevel2 = self.find('>ul >li >ul >li');
        liLevel2.hover(function(){
            $(this).find('ul').stop(true).slideToggle(SPEED);
        })
    });
    
    /* cus-tab tab 标签切换*/
    $('.cus-tab').each(function(){
        var SELF = $(this);
        var tabItem = SELF.find('>.tab-list >li'),
            _index,
            tabContentItem = SELF.find('>.tab-content-box >.tab-panel');
        tabItem.on('click' , function(){
            _index = $(this).index();
            //console.log(_index);
            $(this).stop(true).addClass('active').siblings().removeClass('active');
            tabContentItem.stop(true).removeClass('active').hide().eq(_index).fadeIn().addClass('active');
        })
    })
    
	breadcrumb_text(); //面包屑导航获取
	case_show(); // 产品图片轮播展示
	product_number(); // 产品购买数量
})


function breadcrumb_text () {
	var title_text = $(document).attr("title");
	$('#breadcrumb li.active').text(title_text);
}



function product_number() {
	var product_number = $('.product_number');
	var num = Number(product_number.find('input[type="text"]').val());
	
	product_number.find('input[type="text"]').keyup(function(){  
		var c = $(this);
		if(/[^\d]/.test(c.val())) { //替换非数字字符    
			var temp_amount = c.val().replace(/[^\d]/g, '');
			$(this).val(temp_amount);
		} else {
			num = Number(product_number.find('input[type="text"]').val());
		}
   	});
	
	product_number.find('.reduce').click(function () {
		if ( num > 1 ) {
			num --;
			product_number.find('input[type="text"]').val(num);
		}
	})
	product_number.find('.add').click(function () {
		num ++;
		product_number.find('input[type="text"]').val(num);
	})
}


function case_show() {
	
	$(".case_img_show").hover(function() {
		$(".btn_prev,.btn_next").stop().fadeIn()
	}, function() {
		$(".btn_prev,.btn_next").stop().fadeOut()
	});
	
	$dragBln = false;
	
	$(".case_img").touchSlider({
		flexible: true,
		speed: 200,
		btn_prev: $(".btn_prev"),
		btn_next: $(".btn_next"),
		paging: $(".flicking_con a"),
		counter: function(e) {
			$(".flicking_con a").removeClass("active").eq(e.current - 1).addClass("active");
		}
	});
	var li_H,
		li_W,
		window_W,
		bnt_W = Number($('.case_img_show .flicking_con').width());
	give_size();
	function give_size() {
		
		window_W = window.innerWidth;
		if ( Number(window_W) > 992  ) {
			$('.case_img_show .flicking_con a').css({
				'height': $('.case_img_show .flicking_con a').width(),
				'line-height': $('.case_img_show .flicking_con a').width()-6+'px',
			});
			$('.case_img_show .flicking_con img').css({
				'height': $('.case_img_show .flicking_con a').height()-1
			});
			$('.case_img_show .flicking_con').css({
				'width': '100%',
				'left': 0,
				'bottom': -Number($('.case_img_show .flicking_con').height())-4,
				'margin-left': 0,
			});
			$('.case_img_show').css('margin-bottom', Number($('.case_img_show .flicking_con').height())+30);
		} else {
			$('.case_img_show .flicking_con a').css({
				'height': $('.case_img_show .flicking_con a').width()+4,
				'line-height': $('.case_img_show .flicking_con a').width()-6+'px',
			});
			$('.case_img_show .flicking_con').css({
				'width': 'auto',
				'margin-left': -bnt_W/2,
				'bottom': '10px',
				'left': '50%'
			});
			$('.case_img_show').css('margin-bottom', Number($('.case_img_show .flicking_con').height())+20);
		}
		
		li_W = $('.case_img_show .case_img').width();
		li_H = $('.case_img_show .case_img li').eq(0).height();
		
		$('.case_img_show .case_img ul li').width(li_W).height(li_H).css('line-height',li_H+'px');
		$('.case_img_show .case_img ul').width(li_W).height(li_H);
		$('.case_img_show .case_img').height(li_H);
		$('.case_img_show').height(li_H);
	}
	$(window).resize(function () {
		give_size();
	})
	

	$(".case_img").bind("mousedown", function() {
		$dragBln = false;
	});

	$(".case_img").bind("dragstart", function() {
		$dragBln = true;
	});

	$(".case_img a").click(function() {
		if($dragBln) {
			return false;
		}
	});

	timer = setInterval(function() {
		$(".btn_next").click();
	}, 5000);

	$(".case_img_show").hover(function() {
		clearInterval(timer);
	}, function() {
		timer = setInterval(function() {
			$(".btn_next").click();
		}, 5000);
	});

	$(".case_img").bind("touchstart", function() {
		clearInterval(timer);
	}).bind("touchend", function() {
		timer = setInterval(function() {
			$(".btn_next").click();
		}, 5000);
	});
	
}
