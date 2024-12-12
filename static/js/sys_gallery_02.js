var Sys_g02 = function(obj){
    this.items = null,
    this.curr = 0,
    this.flag = null,
    this.objH = 0,
    this.objW = 0,

    this.init =  function(){
        this.items = obj.find('.item');
        if(this.items.length == 0) return;
        this.objH = obj.height();
        this.objW = obj.width();
        var self = this;
        this.items.each(function(index,element){
            var $this = $(this);
            var degNum = Math.ceil(Math.random()*30)-20;    //初始化随机旋转角度
            
            var mLeft = (Math.ceil(Math.random()*300)+(Math.random()+index)*140);   //初始化随机left
            var mTop = (Math.ceil(Math.random()*50)+(Math.random()+index)*30);   //初始化随机top

            if(mLeft >= this.objW){
                mLeft = this.objW - 15;
            }
            if(mTop > this.objH) {
                mTop = this.objH - 15;
            }
            $this.css({'left' : mLeft, 'top' : mTop});
            self.rotate($this, degNum);

        });

        this.items.on('click' , function(){
            var that = $(this);
            self.animate(that);
        })
    },
    this.rotate = function(ele,degNum){
        ele.css({
            'transform' : "rotate("+ degNum +"deg)",
            '-webkit-transform' : "rotate("+ degNum +"deg)",
            '-moz-transform' : "rotate("+ degNum +"deg)",
            '-ms-transform' : "rotate("+ degNum +"deg)",
            '-o-transform' : "rotate("+ degNum +"deg)",
        });
    },
    this.scale = function(ele,scl){
        ele.css({
            'transform' : "scale("+ scl +")",
            '-webkit-transform' : "scale("+ scl +")",
            '-moz-transform' : "scale("+ scl +")",
            '-ms-transform' : "scale("+ scl +")",
            '-o-transform' : "scale("+ scl +")",
        });
    },
    this.animate = function(ele){
        var that = this;
        if(this.curr > 0) {
            this.flag.removeClass('active').css({'left': ele.css('left'), 'top' : ele.css('top')});
            this.rotate(this.flag , Math.ceil(Math.random()*30)-20);
        }
        ele.addClass('active move').stop(true).animate({'left': '50%', 'top': '50%', 'margin-left' : -ele.width()/2, 'margin-top' : -ele.width()/2}, function(){
            that.afterAni(ele);                 
        });
    },
    this.afterAni = function(ele){
        this.scale(ele , 1.5);
        ele.removeClass('move');
        this.curr = 1;
        this.flag = ele;
    }
}
$(function(){
    $('.sys_gallery_02').each(function(){
        var that = new Sys_g02($(this));
        that.init();
    })
})