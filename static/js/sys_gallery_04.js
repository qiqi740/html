var Gallery_04 = function(obj){

    this.mask = null,
    this.children = null,
    this.animateInterval = 500,
    this.objShow = null,
    this.index = 0,
    this.imgSrc = null,
    this.objShowWidth = 0,
    this.objShowHeight = 0,
    this.imgArr = [],
    this.imgDiv = null,
    this.closeBtn = null,

    this.init = function(){
        this.children = obj.find('.gallery-item');
        this.imgDiv = obj.find('.img');
        this.mask = obj.find('.gallery-mask');
        this.objShow = obj.find('.gallery-show');
        this.closeBtn = this.objShow.find('.close-btn');
        var temp = this.children.eq(0);

        this.getSrc();
        var self = this;

        this.children.on('click' , function(){
            $('span.control').remove();
            self.index = $(this).index();

            /* 设置显示图片内容的窗口的初始宽高度 */
            //console.log(temp.width());
            self.objShow.css({
                /* width : temp.width(),
                height : temp.height(),
                "margin-left" : -temp.width()/2,
                "margin-top" : -temp.height()/2 */
                transform:"translate(0,0)"
            });
            
            self.switchActive();
            self.setShowData($(this).index());
            
            var strCtr = '<span class="control prev"><i class="fa fa-chevron-left"></i></span><span class="control next"><i class="fa fa-chevron-right"></i></span>';
            self.objShow.append(strCtr);
        });
        this.closeBtn.on('click', function(){
            self.switchActive();
        })

        /* 键盘操作事件 */
        $(document).on('keyup',function(e){
            e = e || window.event;
            if(e && e.keyCode == 27 && self.objShow.hasClass('active')){
                self.switchActive();
            }
            if(e && e.keyCode == 39){
                self.next();
                self.setShowData(this.index);
            }
            if(e && e.keyCode == 37){
                self.prev();
                self.setShowData(this.index);
            }
        });
        
        this.mask.on('click' , function(){
            self.switchActive();
        });

        this.objShow.on('click' , '.control.prev', function(){
            self.prev();
            self.setShowData(self.index);
        });
        this.objShow.on('click' , '.control.next', function(){
            self.next();
            self.setShowData(self.index);
        });
    },
    this.switchActive = function(obj){
        this.mask.hasClass('active')
        ? this.mask.stop(true).fadeOut(this.animateInterval).removeClass('active') 
        : this.mask.stop(true).fadeIn(this.animateInterval).addClass('active');

        this.objShow.hasClass('active')
        ? this.objShow.stop(true).fadeOut(this.animateInterval).removeClass('active') 
        : this.objShow.stop(true).fadeIn(this.animateInterval).addClass('active');
    },
    this.setShowData = function(index){
        this.objShow.children('img').attr('src',this.imgArr[this.index]);
        this.objShow.children('p.name').text(this.children.eq(this.index).find('.name').text());
    },
    /* this.setShowData = function(index){
        this.objShow.children('img').attr('src',this.children.eq(this.index).find('img').attr('src'));
        this.objShow.children('p.name').text(this.children.eq(this.index).find('.name').text());
    }, */
    this.prev = function(){
        --this.index < 0 ? this.index = this.children.length-1 : this.index;
    },
    this.next = function(){
        ++this.index > this.children.length-1 ? this.index = 0 : this.index;
    },
    this.getSrc = function(){
        for(var i = 0; i<this.imgDiv.length; i++) {
            this.imgArr.push(this.imgDiv.eq(i).data('src'))
        }
        return this.imgArr;
    }
}
$(function(){
    $('.sys_gallery_04').each(function(){
        var temp = new Gallery_04($(this));
        temp.init();
    });
})
