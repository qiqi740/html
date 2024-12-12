var Cart = {
	add:function(pid, btn){
		var AddCount = Cint($("#AddCount").val());
		AddCount = AddCount >0 && AddCount< 10000 ? AddCount : 1;
		var w = $(window).width();
		var h = $(window).height();
		var left = (w - 300)/2;
		var top = (h - 200) / 2;
		if(NotIsNull(btn)){
			left = $(btn).offset().left;
			top = $(btn).offset().top;
		}
		var div = $(CreateElement("div"));
		div.html("<h2>添加成功！</h2>");
		div.css({width:"160px", height:"36px", 'line-height':"36px;", 'text-align':'center', 'border-radius':'10px','background-color':'#FFF', top:top+"px", left:left+"px", 'z-Index:':10000, display:'block', position:'fixed'});
		$.ajax({
			type:"POST",
			url:"/Ajax/AjaxUser.html" ,
			data:{action:"CartAdd", pid:pid, AddCount:AddCount},
			dataType:"json",//"json"
			timeout:30000,
			success:function(msg){
				Cart.getCount();
			}
		});
		div.show(500, function(){
			div.animate({top:(h)+"px", "opacity": 0}, 1000, function(){
				div.remove();
			});
		});
	},
	del:function(pid){
		if(window.confirm("您确认删除吗？")){
			$.ajax({
				type:"POST",
				url:"/Ajax/AjaxUser.html" ,
				data:{action:"CartDel", pid:pid},
				dataType:"json",//"json"
				timeout:30000,
				success:function(msg){
					location.reload();
				}
			});
		}
	},
	delSelect:function(){
		var pid = "";
		$("input[name='ck']:checked").each(function () {
			pid += $(this).val() + ",";
		});
		if(pid.length < 1){
			alert('请至少选择一个商品');
			return false;	
		}
		if(window.confirm("您确认删除吗？")){
			$.ajax({
				type:"POST",
				url:"/Ajax/AjaxUser.html" ,
				data:{action:"CartDelAll", pid:pid},
				dataType:"json",//"json"
				timeout:30000,
				success:function(msg){
					location.reload();
				}
			});
		}
	},
	update:function(pid, count){
		$.ajax({
			type:"POST",
			url:"/Ajax/AjaxUser.html" ,
			data:{action:"CartUpdate", pid:pid, count:count},
			dataType:"json",//"json"
			timeout:30000,
			success:function(msg){
				//$("#tr_"+pid).find(".change-num").val(msg.msg);
				Cart.getCount();
				Cart.CalcPrice();
			}
		});
	},
	getCount:function(){
		$.ajax({
			type:"POST",
			url:"/Ajax/AjaxUser.html" ,
			data:{action:"CartCount"},
			dataType:"json",//"json"
			timeout:30000,
			success:function(msg){
				$(".fa-shopping-cart").html(msg.msg);
			}
		});
	},
	CalcPrice:function(){
		var SumPrice = 0;		
		$("#cartTable").find("tr").each(function(index, element) {
            var tr = $(this);
			if(tr.find(".SinglePrice").size() > 0){
				var Price = tr.find(".SinglePrice").html();
				Price = parseFloat(Price).toFixed(2);
				var count = parseInt(tr.find(".change-num").val());
				var AllPrice = Price * count;
				tr.find(".AllPrice").html(AllPrice.toFixed(2));
				SumPrice += AllPrice;
			}
        });
		$(".SumPrice").html(SumPrice.toFixed(2));
	}
}
$(function(){
	//全选
    $('.check-all').on('click' , function(){
        var flag = $(this).find('input[type="checkbox"]').prop('checked');
        $('.check-all').find('input[type="checkbox"]').prop('checked', flag);
        $('.table-list tr .check-item >input[type="checkbox"]').prop('checked', flag);
    })
	$('.btn-add').on('click',function(){
        var _this = $(this),
            changeInput = _this.parents('tr').find('input.change-num'),
            change_num = parseInt(changeInput.val());
        change_num += 1;
		if(change_num > 1){
			_this.parents('tr').find('.btn-reduce').removeClass('disabled');
		}
        changeInput.val(change_num);
		
		var pid = _this.parents('tr').find('input[name="ck"]').val();
		Cart.update(pid, change_num);
		Cart.CalcPrice();
    })
    $('.btn-reduce').on('click',function(){
        var _this = $(this),
        changeInput = _this.parents('tr').find('input.change-num'),
            change_num = parseInt(changeInput.val());
        change_num -= 1;
        if(change_num <=1){
            change_num = 1;
			_this.addClass('disabled');
        }else{
			_this.removeClass('disabled');	
		}
        changeInput.val(change_num);
		var pid = _this.parents('tr').find('input[name="ck"]').val();
		Cart.update(pid, change_num);
		Cart.CalcPrice();
    })
});