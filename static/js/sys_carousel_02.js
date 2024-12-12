var Sys_c02 = function(obj){
    this.inner = null,
    this.items = null,
    this.index = 0,
    this.size = 0,
    this.animateInt = 600,
    this.switchInt = 4000,
    this.timer = null,
    this.indicatorBox = null,
    this.indicator = null,

    this.init = function(){
        this.inner = obj.children('.content');
        this.items = this.inner.children();
        this.size = this.items.length;
        if(this.size < 1) return;
        this.inner.children('.carousel-item').addClass('active');
        this.inner.children('.carousel-item').css('display','none');
        this.inner.children('.carousel-item:eq(0)').css('display','block');

        this.indicatorBox = obj.children('.indicators');

        var self = this;
        self.start();
        self.createIndicator();
        obj.on('click', '.control.next', function(){
            self.next();
        });
        obj.on('click', '.control.prev', function(){
            self.prev();
        });
        obj.hover(function(){
            self.stop();
        } , function(){
            self.start();
        });

        this.indicatorBox.on('click', '>li' , function(){
            if(self.index == $(this).index()) return;
            self.index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            self.animate();
        });

    },
    this.next = function(){
        this.index = ++this.index >= this.size ? 0 : this.index;
        this.animate();
    },
    this.prev = function(){
        this.index = --this.index < 0 ? this.size -1 : this.index;
        this.animate();
    },
    this.animate = function(){
        this.items.stop(true).eq(this.index).fadeIn(this.animateInt).addClass('active')
            .siblings().removeClass('active').fadeOut(this.animateInt);
        this.indicatorBox.children('li').eq(this.index).addClass('active').siblings().removeClass('active');
    },
    this.stop = function(){
        clearInterval(this.timer);
    },
    this.start = function(){
        var THAT = this;
        this.stop();
        this.timer = setInterval(function(){
            THAT.next();
        },THAT.switchInt);
    },
    this.createIndicator = function(){
        var ind_str = '<li></li>';
        for(var i = 0; i< this.size; i++){
            this.indicatorBox.append(ind_str);
        }
        this.indicatorBox.children('li').eq(0).addClass('active').siblings().removeClass('active');
    }
}
$(function(){
    $('.sys_carousel_02').each(function(){
        var that = new Sys_c02($(this));
        that.init();
    })
})