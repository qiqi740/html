var Sys_c01 = function(obj){
    this.inner = null,
    this.items = null,
    this.count = 0,
    this.interval = 3000,
    this.index = 0,
    this.timer = null,
    //移动端用参数
    this.startX = 0,
    this.startY = 0,
    this.endX = 0,
    this.moveDistance = 100,

    this.init = function(){
        this.inner = obj.children('.content');
        this.items = this.inner.children();
        this.count = this.items.length;
        
        if (this.count <= 0) return;
        var self = this;
        self.items.eq(0).addClass('active');
        this.setWidth();
        $(window).on('resize' , function(){
            self.setWidth();
        });
        self.startMove();
        obj.on('click', '.control.prev' , function(){
            //console.log(this);
            self.prev();
        });
        obj.on('click', '.control.next' , function(){
            self.next();
        });
        obj.hover(function(){
            self.stop();
        }, function(){
            self.startMove();
        });

        //移动端事件
        obj.on("touchstart", function(e) { // 手指接触的时候
            self.stop();
            if (e.cancelable) {
                // 判断默认行为是否已经被禁用
                self.eventCheck(e);
            }
            self.startX = e.originalEvent.targetTouches[0].pageX;
        });
        obj.on("touchmove", function(e) { // 手指接触的时候
            if (e.cancelable) {
                self.eventCheck(e);
            }
            self.endX = e.originalEvent.changedTouches[0].pageX - self.startX;
            
        });
        obj.on('touchend', function(e){
            if (e.cancelable) {
                self.eventCheck(e);
            }
            if(self.endX > self.moveDistance) {
                self.prev();
            }
            if(self.endX <= -self.moveDistance) {
                self.next();
            }
            self.startMove();
        })

    },
    this.setWidth = function(){
        this.items.width(obj.width());
        this.inner.width(this.items.width() * this.count);
    },
    this.animate = function(){
        this.inner.stop(true).animate({'margin-left' : -(this.items.width() * this.index)},'linear')
    },
    this.next = function(){
        this.index = ++this.index == this.count ? 0 : this.index;
        this.animate();
    },
    this.prev = function(){
        this.index = --this.index < 0 ? this.count - 1 : this.index;
        this.animate();
    },
    this.stop = function(){
        var THIS = this;
        clearInterval(THIS.timer);
    },
    this.startMove = function(){
        var THIS = this;
        this.stop();
        this.timer = setInterval(function(){
            THIS.next();
        },THIS.interval);
    },
    this.eventCheck = function(e){
        if (!e.defaultPrevented) {
            e.preventDefault();
        }
    }
}

$(function(){
    $('.sys_carousel_01').each(function(){
        var that = new Sys_c01($(this));
        that.init();
    })
})