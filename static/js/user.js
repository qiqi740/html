var User = {
    n: 360,
    t: null,
    login: function () {
        $('#user-register').modal('hide');
        $('#user-reset').modal('hide');
    },
    reg: function () {
        $('#user-login').modal('hide');
        $('#user-reset').modal('hide');

    },
    reset: function () {
        $('#user-login').modal('hide');
        $('#user-register').modal('hide');
    },
    checkLogin: function () {
        if (!CheckValue("LoginUsername", "请输入帐号")) return false;
        if (!CheckValue("LoginPwd", "请输入密码")) return false;
        var username = $("#LoginUsername").val();
        var pwd = $("#LoginPwd").val();
        $("#divLogin").css({ display: "" });
        $("#LoginStatus").html("<img src='/Public/img/loading.gif' />");
        $.ajax({
            type: "POST",
            url: "/Ajax/AjaxUser.html",
            data: { action: "UserLogin", username: username, pwd: pwd, SiteID: $("#SiteID").val() },
            dataType: "json", //"json"
            timeout: 30000,
            success: function (msg) {
                if (msg.success == 1) {
                    location.href = 'user/info.html';
                } else {
                    $("#LoginStatus").html(msg.msg);
                }
            }
        });
    },
    checkReg: function () {
        if (!CheckValue("RegUsername", "请输入手机号")) return false;
        if (!CheckMobile("RegUsername", "请输入正确的手机号码")) return false;
        if (!CheckValue("RegPwd", "请输入密码")) return false;
        if (!CheckLength("RegPwd", 6, 20, "密码长度必须再6-20位之间")) return false;
        if (!CheckValue("RegPwd2", "请输入确认密码")) return false;
        if (!CheckConfirmPwd("RegPwd", "RegPwd2", "密码与确认密码不一致，请重新输入")) return false;
        if (!CheckValue("RegCode", "请输入验证码")) return false;
        var username = $("#RegUsername").val();
        var pwd = $("#RegPwd").val();
        var code = $("#RegCode").val();
        $("#divReg").css({ display: "" });
        $("#RegStatus").html("<img src='/Public/img/loading.gif' />");
        $.ajax({
            type: "POST",
            url: "/Ajax/AjaxUser.html",
            data: { action: "UserReg", username: username, pwd: pwd, code: code, SiteID: $("#SiteID").val() },
            dataType: "json", //"json"
            timeout: 30000,
            success: function (msg) {
                if (msg.success == 1) {
                    location.href = 'user/info.html';
                } else {
                    $("#RegStatus").html(msg.msg);
                }
            }
        });
    },
    sendRegCode: function (btn) {
        if (!CheckMobile("RegUsername", "请输入正确的手机号码")) return false;
        btn.disabled = true;
        var username = $("#RegUsername").val();
        $.ajax({
            type: "POST",
            url: "/Ajax/AjaxUser.html",
            data: { action: "SendRegCode", username: username, SiteID: $("#SiteID").val() },
            dataType: "json", //"json"
            timeout: 30000,
            success: function (msg) {
                if (msg.success != 1) {
                    alert(msg.msg);
                    btn.disabled = false;
                    $(btn).html("发送验证码");
                } else {
                    User.checkTime(btn);
                }
            }
        });
    },
    sendResetCode: function (btn) {
        if (!CheckMobile("ResetUsername", "请输入正确的手机号码")) return false;
        btn.disabled = true;
        var username = $("#ResetUsername").val();
        $.ajax({
            type: "POST",
            url: "/Ajax/AjaxUser.html",
            data: { action: "SendResetCode", username: username, SiteID: $("#SiteID").val() },
            dataType: "json", //"json"
            timeout: 30000,
            success: function (msg) {
                if (msg.success != 1) {
                    alert(msg.msg);
                    btn.disabled = false;
                    $(btn).html("发送验证码");
                } else {
                    User.checkTime(btn);
                }
            }
        });
    },
    checkTime: function (btn) {
        User.t = setInterval(function () {
            if (User.n > 1) {
                btn.disabled = true;
                $(btn).html("剩余" + User.n + "秒");
                User.n -= 1;
            } else {
                clearInterval(User.t);
                btn.disabled = false;
                $(btn).html("发送验证码");
            }
        }, 1000);

    },
    checkReset: function () {
        if (!CheckValue("ResetUsername", "请输入手机号")) return false;
        if (!CheckMobile("ResetUsername", "请输入正确的手机号码")) return false;
        if (!CheckValue("ResetPwd", "请输入密码")) return false;
        if (!CheckLength("ResetPwd", 6, 20, "密码长度必须再6-20位之间")) return false;
        if (!CheckValue("ResetPwd2", "请输入确认密码")) return false;
        if (!CheckConfirmPwd("ResetPwd", "ResetPwd2", "密码与确认密码不一致，请重新输入")) return false;
        if (!CheckValue("ResetCode", "请输入验证码")) return false;
        var username = $("#ResetUsername").val();
        var pwd = $("#ResetPwd").val();
        var code = $("#ResetCode").val();
        $("#divReset").css({ display: "" });
        $("#ResetStatus").html("<img src='/Public/img/loading.gif' />");
        $.ajax({
            type: "POST",
            url: "/Ajax/AjaxUser.html",
            data: { action: "UserReset", username: username, pwd: pwd, code: code, SiteID: $("#SiteID").val() },
            dataType: "json", //"json"
            timeout: 30000,
            success: function (msg) {
                if (msg.success == 1) {
                    location.href = 'user/info.html';
                } else {
                    $("#ResetStatus").html(msg.msg);
                }
            }
        });
    },
    ChangePrivince: function (v) {
        $.ajax({
            url: "/Ajax/AjaxUser.html",
            type: 'POST',
            data: { action: 'ChangeProvince', Province: v },
            dataType: 'json',
            timeout: 30000,
            error: function () { alert('出现未知错误!'); },
            success: function (msg) {
                d("City").options.length = 1;
                for (var i = 0; i < msg.length; i++) {
                    var o = new Option(msg[i].CityName, msg[i].CityName);
                    d("City").options.add(o);
                }
            }
        });
    },
    ChangeCity: function (v) {
        $.ajax({
            url: "/Ajax/AjaxUser.html",
            type: 'POST',
            data: { action: 'ChangeCity', City: v },
            dataType: 'json',
            timeout: 30000,
            error: function () { alert('出现未知错误!'); },
            success: function (msg) {
                d("Area").options.length = 1;
                for (var i = 0; i < msg.length; i++) {
                    var o = new Option(msg[i].DistrictName, msg[i].DistrictName);
                    d("Area").options.add(o);
                }
            }
        });
    },
    ChangePwd: function () {
        if (!CheckValue("Pwd", "请输入原密码")) return false;
        if (!CheckLength("Pwd1", 6, 20, "密码长度必须再6-20位之间")) return false;
        if (!CheckValue("Pwd2", "请输入确认密码")) return false;
        if (!CheckConfirmPwd("Pwd1", "Pwd2", "密码与确认密码不一致，请重新输入")) return false;
    },
    ChangeMobile: function () {
        if (!CheckMobile("RegUsername", "请输入正确的手机号码")) return false;
        if (!CheckValue("code", "请输入验证码")) return false;
    },
    checkAddr: function () {
        if (!CheckValue("TrueName", "请输入收货人姓名")) return false;
        if (!CheckValue("Province", "请选择省份")) return false;
        if (!CheckValue("City", "请选择城市")) return false;
        if (!CheckValue("Area", "请选择地区")) return false;
        if (!CheckValue("Addr", "请输入详细地址")) return false;
        if (!CheckValue("Tel", "请输入联系电话")) return false;
    },
    delAddr: function (id) {
        if (window.confirm("您确认删除吗？")) {
            $.ajax({
                url: "/Ajax/AjaxUser.html",
                type: 'POST',
                data: { action: 'DelAddr', id: id },
                dataType: 'json',
                timeout: 30000,
                error: function () { alert('出现未知错误!'); },
                success: function (msg) {
                    if (msg.success == 1) {
                        alert("删除成功！");
                        location.href = "address.html";
                    } else {
                        alert(msg.msg);
                    }
                }
            });
        }
    },
    setDefaultAddr: function (id) {
        $.ajax({
            url: "/Ajax/AjaxUser.html",
            type: 'POST',
            data: { action: 'SetDefaultAddr', id: id },
            dataType: 'json',
            timeout: 30000,
            error: function () { alert('出现未知错误!'); },
            success: function (msg) {
                if (msg.success == 1) {
                    alert("设置成功！");
                    location.href = "address.html";
                } else {
                    alert(msg.msg);
                }
            }
        });
    },
    cancelOrder: function (id) {
        if (window.confirm("您确认取消该订单吗？")) {
            $.ajax({
                url: "/Ajax/AjaxUser.html",
                type: 'POST',
                data: { action: 'CancelOrder', id: id },
                dataType: 'json',
                timeout: 30000,
                error: function () { alert('出现未知错误!'); },
                success: function (msg) {
                    if (msg.success == 1) {
                        alert("取消成功！");
                        location.href = "order.html";
                    } else {
                        alert(msg.msg);
                    }
                }
            });
        }
    },
    changePay: function (v) {
        if (NotIsNull(d("rememberMe1"))) {
            $("#rememberMe1")[0].checked = v == 0;
        }
        if (NotIsNull(d("rememberMe2"))) {
            $("#rememberMe2")[0].checked = v == 1;
        }
    },
    ShowPayWin: function (id) {
        $("#OrderPayID").val(id);
    },
    SelectPay: function () {
        var bl1 = NotIsNull(d("rememberMe1")) ? $("#rememberMe1")[0].checked : false;
        var bl2 = NotIsNull(d("rememberMe2")) ? $("#rememberMe2")[0].checked : false;
        var OrderID = $("#OrderPayID").val();
        if (bl1) {
            window.open("order.html?OrderPay=" + OrderID + "&PayChannel=0");
        } else if (bl2) {
            $('#user-pay').modal('hide');
            $('#user-wxpay').modal('show');
            var url = "order.html?OrderPay=" + OrderID + "&PayChannel=1";
            $("#WXPayImg").html("");
            $.ajax({
                url: url,
                type: 'POST',
                data: { ac: 'OrderPay' },
                dataType: 'html',
                timeout: 30000,
                error: function () { alert('出现未知错误!'); },
                success: function (msg) {
                    $("#WXPayImg").html(msg);
                    User.GetPayStatus(OrderID);
                }
            });
        } else {
            alert("请选择一种支付方式");
        }
    },
    GetPayStatus: function (OrderID) {
        $.ajax({
            url: '/Ajax/AjaxUser.html',
            type: 'POST',
            data: { action: 'GetPayStatus', OrderID: OrderID },
            dataType: 'json',
            timeout: 30000,
            error: function () { },
            success: function (data) {
                if (data.success == 1) {
                    location.href = "order.html";
                } else {
                    setTimeout(function () {
                        User.GetPayStatus(OrderID);
                    }, 3000);
                }
            }
        });
    }
}