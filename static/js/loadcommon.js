$(function(){
   if($('#common-header').length > 0){
		$('#common-header').load('header.html?data='+Math.random(), function(){
			changeNavSel();
		})
	}else {
		changeNavSel();
	}
	if($('#common-footer').length > 0){
		$('#common-footer').load('footer.html?data='+Math.random())
	}
})

var changeNavSel = function(){
    var _index = 0;
    $('ul.nav.navbar-nav > li').each(function(){
        var self = $(this);
        var dataHref = self.data('href');
        if(window.location.href.indexOf(dataHref) > -1){
            _index = self.index();
            $('ul.nav.navbar-nav > li').eq(_index).addClass('active').siblings().removeClass('active');
        }
    })
}