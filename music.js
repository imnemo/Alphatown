(function() {
	if (window.com_istrone_app_enabled)
		return;
	
	var listenBtn = $("<a href='javascript:void(0);' >Listen</a>");
	var show = true;
	var topIndex = $("div.mapnav").css('z-index');
	
	function showMusiPanel(){
		musicPanel.show().animate({
			left : "10px"
		}).animate({
			top : "30px"
		});
		listenBtn.html("Hide");
		show = !show;
	};
	
	function hideMusiPanel(){
		listenBtn.html("Listen");
		musicPanel.hide(500);
		show = !show;
	};
	
	function unLoadMe(){
		listenBtn.remove();
		musicPanel.remove();
		window.com_istrone_app_enabled = undefined;
	};
	
	listenBtn.click(function() {
		if (show) {
			showMusiPanel();
		} else {
			hideMusiPanel();
		}
	});
	
	var musicPanel = $(
			"<div style='z-index:6000;position:absolute;width;1000px;height:800px;background-color:black'>" +
			"<div style='width:800px;'>" +
				"<a href='javascript:void(0)' id='unLoadMe'>UnloadMe</a>"+"<a href='javascript:void(0)' id='hideMe'>HideMe</a>"+"CopyRight@istrone"+
			"</div>"+
			"<iframe src='http://douban.fm/?start=192555gd69dg1000430&cid=1000430' style='width:1000px;height:700px;'></iframe>" +
			"</div>")
			.hide();
	$("a.user-logout").before(listenBtn).before(musicPanel);
	$('#unLoadMe').click(unLoadMe);
	$('#hideMe').click(hideMusiPanel);
	window.com_istrone_app_enabled = true;
	$("a.toggle-dashboard").click();
})();
