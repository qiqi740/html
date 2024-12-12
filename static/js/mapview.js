var MapView = {
	map:null,
	zoom:12,
	addr:'',
	company:'',
	initAll:function(){
		$(".amap").each(function(index, element) {
			$(this).html("");
			var p = $(this).parent().parent();
			var old = ToJson(p.attr("param"));
			var addr = old.Link;
			var company = old.Title;
			var zoom = Cint(old.RecordID);
			MapView.zoom = (zoom<19 || zoom >0) ? zoom : 12;
			MapView.init(this, addr, company);
		});
	},
	init:function(MapID, addr, company){
		MapView.map = new BMap.Map(MapID);
		var point = new BMap.Point(116.331398,39.897445);
		MapView.map.centerAndZoom(point,MapView.zoom);
		/*
		function myFun(result){
			var cityName = result.name;
			Map.map.setCenter(cityName);
		}
		var myCity = new BMap.LocalCity();
		myCity.get(myFun);*/
		MapView.addMapControl();
		MapView.SearchAddr(addr, company);
	},
	sure:function(){
		MapView.zoom = MapView.map.getZoom();
	},
	SearchAddr:function(addr, company){
		MapView.zoom =  MapView.map.getZoom();
		var allOverlay = MapView.map.getOverlays();
		for (var i = 0; i < allOverlay.length -1; i++){
            //if(allOverlay[i].getLabel().content == "我是id=1"){
            MapView.map.removeOverlay(allOverlay[i]);
        }
		var myGeo = new BMap.Geocoder();
		// 将地址解析结果显示在地图上,并调整地图视野
		myGeo.getPoint(addr, function(point){
			if (point) {
				MapView.map.centerAndZoom(point, MapView.zoom);
				MapView.map.addOverlay(new BMap.Marker(point));
				MapView.AddMaker(company, addr, point);
				//alert("当前地图中心点：" + Map.map.getCenter().lng + "," + Map.map.getCenter().lat);
				//alert("级别：" + Map.map.getZoom());
			}else{
				//alert("没有解析到结果!");
			}
		}, "");	
	},
	AddMaker:function(company, addr, point){
		var marker = new BMap.Marker(point);  // 创建标注
		
		var myIcon = new BMap.Icon("/public/img/mapPoint.png", new BMap.Size(30, 30), {  
                        offset: new BMap.Size(10, 25), // 指定定位位置  
                        imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移  
                    });
		//var marker=new BMap.Marker(point,{icon:myIcon});
		var opts = {
		  width : 200,     // 信息窗口宽度
		  height: 50,     // 信息窗口高度
		  title : "<b>" + company + "</b>" , // 信息窗口标题
		  enableMessage:true,//设置允许信息窗发送短息
		  message:""
		}
		var infoWindow = new BMap.InfoWindow("地址：" + addr, opts);  // 创建信息窗口对象 
		marker.addEventListener("click", function(){          
			MapView.map.openInfoWindow(infoWindow,point); //开启信息窗口
		});
		MapView.map.addOverlay(marker);              // 将标注添加到地图中
		MapView.map.centerAndZoom(point, Map.zoom);
		marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
	},
    addMapControl:function(){
		MapView.map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        MapView.map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        //向地图中添加缩放控件
		var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
		MapView.map.addControl(ctrl_nav);
		//向地图中添加比例尺控件
		var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
		MapView.map.addControl(ctrl_sca);
    }
}
$(function(){
	MapView.initAll();
});