var Word = {
	post:function(btn){
		var p = $(btn).parent().parent();
		var username = p.find("input[name='username']").val().trim();
		var email = p.find("input[name='email']").val().trim();
		var tel = p.find("input[name='tel']").val().trim();
		var content = p.find("textarea[name='content']").val().trim();
		if(username.length < 2){
			alert("请输入姓名");
			p.find("input[name='username']")[0].focus();
			return false;
		}else if(tel.length < 7){
			alert("请输入电话");
			p.find("input[name='tel']")[0].focus();
			return false;
		}else if(content.length < 5){
			alert("请输入留言内容");
			p.find("textarea[name='content']")[0].focus();
			return false;
		}
		if(email.length > 0){
			if(!IsEmail(email)){
				alert("请输入正确的email");
				p.find("input[name='email']")[0].focus();
				return false;
			}
		}
		var url = "/word.html";
		$.ajax({
			type:"POST",
			url:url ,
			data:{ac:'AddWord', username:username, email:email, tel:tel, content:content},
			dataType:"json",//"json"
			timeout:30000,
			success:function(msg){
				if(msg.success == 1){
					alert("提交成功，感谢您的留言！");
					p.find("input[name='username']").val('');
					p.find("input[name='email']").val('');
					p.find("input[name='tel']").val('');
					p.find("textarea[name='content']").val('');
				}else{
					alert(msg.msg);	
				}
			}
		});
	}
}