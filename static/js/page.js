var Page = {
	show:function(a, id, page){
		var url = "ShowWebpart.html";
		var p = $("#"+id);
		var top = p.offset().top;
		p.html("<div style='text-align:center;'><img src='/Public/img/loading.gif'></div>");
		$.ajax({
			url: url,
			type: 'POST',
			data: { id: id, page: page },
			dataType: 'html',
			timeout: 30000,
			error: function () { },
			success: function (data) {
				var webpart = $(data);
				webpart.insertBefore(p);
				p.remove();
				$(window).scrollTop(top - 30);
				Container.initWebpart(webpart);
			}
		});
	}
}