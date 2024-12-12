//siven
function toFixed(f){
	return parseFloat(f).toFixed(2);
}
String.prototype.trim = function(){
	return this.replace(/^\s+|\s+$/g, '');
}
String.prototype.len = function(){
	return this.replace(/[^\x00-\xff]/gi,"aa").length;
}
String.prototype.ReplaceAll = function(str1,str2){
	var s = this;
	if(s=="" || s==null) return s;
	var i = s.indexOf(str1);
	while(i>=0){
		s = s.substring(0,i) + str2 + s.substr(i+str1.length);
		i = s.indexOf(str1); 
	}
	return s;
}
String.prototype.IsDateTime = function(){
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
	var r = this.match(reg); 
	if(r==null)return false; 
	var d= new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]); 
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]);
}
String.prototype.IsDate = function(){
	var r = this.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
	if(r==null)return false; 
	var d= new Date(r[1], r[3]-1, r[4]); 
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
}
String.prototype.IsTime = function(){
	var a = this.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
	if (a == null)return false;
	if (a[1]>24 || a[3]>60 || a[4]>60){ return false; }
	return true;
}
Function.prototype.extend = function(parent){
	for(var pro in parent.prototype){
		this.prototype[pro]=parent.prototype[pro];
	}
}
function d(id){
	return document.getElementById(id);
}
function CheckUserName(id, msg, v){ //v=en|cn
    if (!CheckAccount(d(id).value, v)) {
		alert(msg);
		d(id).focus();
		return false;
	}
	else { return true; }
}
function CheckValue(id, msg){
	if (d(id).value.trim() == ""){
		alert(msg);
		d(id).focus();
		return false;
	}
	else { return true; }
}
function CheckAccount(str, v){
	var parten = /^[\u4e00-\u9fa5\w]+$/; //\w and chinese
	if (v == "en"){
		parten = /^\w+$/; //\w
	}
	return (parten.test(str));	
}
function CheckPrice(id, blAllowEmpty, msg){
	var parten = /^\d+$/;
	var s = d(id).value.trim();
	if(!blAllowEmpty){
		if (s == "") return CheckValue(d(id), msg);
	}
	if( s.indexOf('.') > -1 ){
		parten = /^\d+\.\d+$/;
	}
	if(!parten.test(s)){
		alert(msg);
		d(id).focus();
		return false;
	}
	else{ return true; }
}
function CheckConfirmPwd(pwd1, pwd2, msg){
	if (d(pwd1).value != d(pwd2).value){
		alert(msg);
		d(pwd2).focus();
		return false;
	}
	else { return true; }
}
function CheckLength(id, n1, n2, msg){
	if (d(id).value.length <n1 || d(id).value.length >n2){
		alert(msg);
		d(id).focus();
		return false;
	}
	else { return true; }
}
function CheckChecked(inputName, msg){
	var bl = false;
	var id = document.getElementsByName(inputName);
	for(var i=0; i<id.length; i++){
		if (id[i].checked){
			bl = true;
			return bl;
		}
	}
	alert(msg);
	if(id.length > 1) id[0].focus();
	return bl;
}
function CheckEmail(id, msg){
	if(!IsEmail(d(id).value.trim())){
		alert(msg);
		d(id).focus();
		return false;
	}
	else { return true; }
}
function CheckNum(id, msg){
	if(!IsNumber(d(id).value.trim())){
		alert(msg);
		d(id).focus();
		return false;
	}
	else { return true; }
}
function CheckMobile(id, msg) {
    if (!IsMobile(d(id).value.trim())) {
        alert(msg);
        d(id).focus();
        return false;
    }
    else { return true; }
}
function CheckDate(s) {
	return (s+'').IsDate();	
}
function getCheckedValue(inputName){
	var s = ',';
	var id = document.getElementsByName(inputName);
	for(var i=0; i<id.length; i++){
		if (id[i].checked){
			s = s + id[i].value + ",";
		}
	}
	return s;
}
function GetAbsolute(src){
	var m = src.offsetTop;
	var n = src.offsetLeft;
	var vParent = src.offsetParent;
	while (vParent!=null && vParent.tagName.toUpperCase() != "BODY"){
		n += vParent.offsetLeft;
		m += vParent.offsetTop;
		vParent = vParent.offsetParent;
	}
	var a = new Array(2);
	a[0] = m; a[1] = n;
	return a;
}
function InputNum(evt) {//onkeydown
    evt = window.event || evt;
    var evtCode = evt.keyCode;
    if (evtCode != 8 && evtCode != 37 && evtCode != 39 && evtCode != 46) {
        var txt = SrcElement(evt);
        txt.onkeyup = txt.onpaste = function () { txt.value = RemoveString(txt.value); }
    }
}
function InputNumPrice(evt) {//onkeydown
    evt = window.event || evt;
    var evtCode = evt.keyCode;
    if (evtCode != 8 && evtCode != 37 && evtCode != 39 && evtCode != 46) {
        var txt = SrcElement(evt);
        txt.onkeyup = txt.onpaste = function () { txt.value = RemoveString1(txt.value); }
    }
}
function RemoveString(s) {
    return (s + '').replace(/[^0-9]/g, '');
}
function RemoveString1(s) {
    return (s + '').replace(/[^0-9\.]/g, '');
}
function RemoveHTML(s){
	return (s+'').replace(/<[^>]*>/gi, "");
}
function NotIsNull(obj){
	var bl = false;
	if(typeof(obj) != "undefined" && typeof(obj) != null && obj != null){
		bl = true;
	}
	return bl;
}
//var ajax = new Ajax("1.asp", "");
//ajax.xml.onreadystatechange = function(){ajax.xml.readyState, ajax.xml.status, ajax.xml.responseText;}
//ajax.get();
function Ajax(url, postData){
	this.url = url;
	this.postData = postData;
	this.xml = this.CreateHttp();
}
Ajax.prototype.get = function(){
	this.xml.open("GET", this.url ,true);
	this.xml.send(null);
}
Ajax.prototype.post = function(){
	this.xml.open("POST", this.url ,true);
	this.xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	this.xml.send(this.postData);
}
Ajax.prototype.abort = function(){
	this.xml.abort();
}
Ajax.prototype.CreateHttp = function(){
	var xmlHttp;
	if (window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if (window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
	return xmlHttp;
}
function Cint(n, defaultV){
	var t = RemoveString(n);
	if(t == ''){
		if (NotIsNull(defaultV)) return defaultV;
		else return 0;
	}
	else{
		return parseInt(t);//Math.floor(n);//Math.round(n);
	}
}
function CFloat(n){
	return parseFloat(n);
}
function IsNumber(s){
	return (/^\d+$/.test(s));
}
function IsMobile(m) {
    var p = /^1[3456789][0-9]{9}$/gi;
    return p.test(m);
}
function IsEmail(email){
	var p = /\s*\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*\s*/;
	return p.test(email);
}
function Rnd(){
	return Math.random();
}
//--------IE_FF--------
function ScrollTop(){
	return 	(document.documentElement.scrollTop || document.body.scrollTop);
}
function ScrollLeft(){
	return 	(document.documentElement.scrollLeft || document.body.scrollLeft);
}
function MouseX(evt){
	return (ScrollLeft() + evt.clientX);
} 
function MouseY(evt){
	return (ScrollTop() + evt.clientY);
}
function MouseOffsetX(evt){
	return ( evt.offsetX ? evt.offsetX : evt.layerX );
}
function MouseOffsetY(evt){
	return ( evt.offsetY ? evt.offsetY : evt.layerY );
}
function SrcElement(evt) { 
	return ( evt.target ? evt.target : evt.srcElement ); 
}
function SetOpacity(obj, n){
	obj.style.filter = "alpha(opacity=" + n + ")";
	obj.style.opacity = n/100;
}
function BodyWH(){
	var w = Math.max(document.body.clientWidth, document.documentElement.clientWidth);
	var h = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
	var a = new Array(2);
	a[0] = w; a[1] = h;
	return a;
}
function insertFirst(newChild, div){
	if(div.hasChildNodes){
		div.insertBefore(newChild, div.childNodes[0]);
	}
	else{
		div.appendChild(newChild);
	}
}
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;   
	if (parent.lastChild == targetElement){   
		parent.appendChild(newElement);   
	}
	else{   
		parent.insertBefore(newElement,targetElement.nextSibling);   
	}   
}
function CreateElement(TYPE, id){
	var div = document.createElement(TYPE);
	if(id){ div.setAttribute("id", id); }
	div.style.display = "none";
	document.body.appendChild(div);
	return div;
}
function ShowFlash(id, url, w, h, textHeight, pics, links, texts){
	var hh = h + Cint(textHeight);
	str = '<embed width="'+ w +'" height="'+ hh +'" src="'+ url +'" quality="autohigh" wmode="transparent" type="application/x-shockwave-flash" plugspace="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"';
	if (pics){
		var pics1 = pics.replace(/^\||\|$/g, '');
		var links1 = links.replace(/^\||\|$/g, '');
		var texts1 = texts.replace(/^\||\|$/g, '');
		str += ' FlashVars="pics='+pics1+'&links='+links1+'&texts='+texts1+'&borderwidth='+w+'&borderheight='+h+'&textheight='+textHeight+'"';
	}
	str += ' menu="false"></embed>';
	d(id).innerHTML = str;	
}
function PreloadImg(){
	var imgs = new Array();
	var a = PreloadImg.arguments;
	for(var i=0; i<a.length; i++){
		imgs[i] = new Image();
		imgs[i].src = a[i];
	}
}
function addOnloadEvent(fun){
	var _timer = setInterval(function(){
		if (/loaded|complete/.test(document.readyState)){
			clearInterval(_timer);
			fun();
		}
	}, 100);
}
function addEvent(obj,evt,fn){//addEvent(btn,"onclick",fun)
	if(IsIE()){
		obj.attachEvent(evt,fn);
	}
	else{
		obj.addEventListener(evt.replace(/^on/i,''),fn,false);
	}
}
function removeEvent(obj,evt,fn){
	if(IsIE()){
		obj.detachEvent(evt,fn);
	}
	else{
		obj.removeEventListener(evt.replace(/^on/i,''),fn,false);
	}
}
function autoFrm(Frame){
	if (Frame.contentDocument && Frame.contentDocument.body.offsetHeight){
		Frame.height = "100%";
		Frame.height = Frame.contentDocument.body.offsetHeight<500 ? "100%" : Frame.contentDocument.body.offsetHeight;
	}
	else if(Frame.Document && Frame.Document.body.scrollHeight){
		Frame.height = "100%";
		Frame.height = Frame.Document.body.scrollHeight<500 ? "100%" : Frame.Document.body.scrollHeight;
	}
}
//<iframe id="win" name="win" onload="autoFrm(this)"></iframe>
//window.onerror = function(){return true};
function LoadImg(img, w, h){
	if(IsIE()){
		if(img.readyState!="complete") {return false;}
	}
	else{
		if(!img.complete) {return false;}
	}
	var img1 = new Image();
	img1.src = img.src;
	if ((w/h) >= (img1.width / img1.height)){
		if(img1.height>h){
			img.height = h;
			img.width = (img1.width * h)/img1.height;
		}
	}
	else{
		if(img1.width>w){
			img.width = w;
			img.height = (img1.height * w)/img1.width;
		}
	}
	img1 = null;
}
function IsIE(){
	return navigator.userAgent.toUpperCase().search("MSIE")>-1 ? true : false;
}
function IsFirefox(){
	return navigator.userAgent.toLowerCase().search("firefox")>-1 ? true : false;
}
function IsOpera(){
	return navigator.userAgent.toLowerCase().search("opera")>-1 ? true : false;
}
function PrintTable(id){
	var str = d(id).outerHTML;
	var css = d("linkStyle").href;
	var win = window.open('print');
	win.document.open("text/html","utf-8");
	win.document.write('<link href="'+css+'" type="text/css" rel="stylesheet" />');
	win.document.write(str);
	win.print();
}
function OpenWin(width,height,url,openMode){
	var w = (window.screen.availWidth - width)/2;
	var h = (window.screen.availHeight - height)/2;
	var param = 'dialogTop:'+h+'px;dialogLeft:'+w+'px;dialogHeight:'+height+'px;dialogWidth:'+width+'px;resizable:yes;scroll:1;status:0';
	var param1 = 'top='+h+',left='+w+',height='+height+',width='+width+',toolbar=no,menubar=no,scrollbars=no,resizable=yes';
	window.open(url,"select",param1);
}
function GetWin(){
    var win = window.dialogArguments;
    if(!NotIsNull(win)){
        win = window.opener;
    }
    return win;
}
function HTMLEncode(html){
	var temp = document.createElement ("div");
	(temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
	var str = temp.innerHTML;
	temp = null;
	if(!IsIE()){
		return str.replace(/\n/gi, '<br>').replace(/ /g, '&nbsp;');
	}
	else{
		return str;
	}
}
function HTMLDecode(text){
	var temp = document.createElement("div");
	if(!IsIE()){
		text = text.replace(/<br[^>]*>/gi, '\n').replace(/&nbsp;/g, ' ');
	}
	temp.innerHTML = text;
	var str = temp.innerText || temp.textContent;
	temp = null;
	return str;
}
function OnFocus(txt, msg){
	if(txt.value == msg){txt.value = "";}
	txt.style.color = "#000000";
	txt.onblur = function(){
		if(this.value.trim()==''){
			txt.value = msg;
			txt.style.color = "#cccccc";
		}
	}
}
function ToJson(str){
	return eval('(' + str + ')');
}
function JsonToString(obj){
	//JSON.stringify(obj)
	return $.toJSON(obj);
}
function AddFavorite(){
	if (window.sidebar){
		window.sidebar.addPanel(document.title, document.URL, '' );
	}
	else if(document.all){
		window.external.AddFavorite(document.URL, document.title);
	}
}
function SetHome(obj,vrl){
	try{
		obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
	}
	catch(e){
	}
}
function goPage() {
    var url = d("fyUrl").value.replace("{0}", d("pnum").value);
    location.href = url;
}
function checkLogin() {
    var UserInfo = getCookie("UserInfo");
    if (UserInfo == null || UserInfo == '') {
        return false;
    } else {
        return true;
    }
}
function checkLoginAndGoTo() {
    var bl = checkLogin();
    if (!bl) {
        location.href = 'http://www.51site.net/Login.html?return=' + escape(location.href);
    }
    return bl;
}
function setCookie(cookieName, cookieValue, DayValue) {
    var Days = 1;
    if (DayValue != null) { Days = DayValue; }
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = cookieName + "=" + escape(cookieValue) + ";path=/;expires=" + exp.toGMTString();
}
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;
}
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";path=/;expires=" + exp.toGMTString();
}
function loadJS(src) {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = false;
    ga.src = src;
	document.getElementsByTagName("head")[0].appendChild(ga);
}
function loadCSS(src) {
    var ga = document.createElement('link'); ga.type = 'text/css'; ga.async = false;
    ga.rel = "stylesheet";
    ga.href = src;
	document.getElementsByTagName("head")[0].appendChild(ga);
}
function showVideo(id, w, h, fileUrls) {
    var flashvars = 'autostart=true&LogoText=www.51site.net&LogoUrl=http://www.51site.net/images/logo.png';
    var s = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="' + w + '" height="' + h + '">';
    s += '<param name="movie" value="/js/Flvplayer.swf?' + flashvars + '" />';
    s += '<param name="quality" value="high" />';
    s += '<param name="allowFullScreen" value="true" />';
    s += '<param name="FlashVars" value="vcastr_file=' + fileUrls + '&' + flashvars + '" />';
    s += '<embed src="/js/Flvplayer.swf" allowfullscreen="true" flashvars="vcastr_file=' + fileUrls + '?' + flashvars + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + w + '" height="' + h + '"></embed>';
    s += '</object>';
    d(id).innerHTML = s;
}
function Resize(obj){
	if(IsIE()){
		if(obj.readyState!="complete") {return false;}
	}
	else{
		if(!obj.complete) {return false;}
	}
	var img1 = new Image();
	img1.src = obj.src;
	var w = obj.width;
	var h = obj.height;
	obj.parentNode.style.display = 'block';
	obj.parentNode.style.width = obj.width + "px";
	obj.parentNode.style.height = obj.height + "px";
	obj.parentNode.style.overflow = 'hidden';
	var left = 0;
	var top = 0;
	var iW = 0;
	var iH = 0;
	if ((w /h) >= (img1.width / img1.height)){
		if(img1.width>w){
			iW = w;
			iH = (img1.height * w)/img1.width;
			obj.style.height = iH + "px";
		}
		top = Math.floor((h-iH)/2);
	}else{
		if(img1.height>h){
			iH = h;
			iW = (img1.width * h)/img1.height;
			obj.style.width = iW + "px";
		}
		left = Math.floor((w-iW)/2);
	}
	obj.style.margin = top + "px " + left + "px";
}
function ShowColor(txt){
	$(txt).ColorPicker({
        color: $(txt).val(),
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $(txt).css('backgroundColor', '#' + hex);
			$(txt).val("#"+hex);
        }
    });
}