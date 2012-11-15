
/*
 * GET users listing.
 */
exports.list = function(req, res){
    var href = "javascript:var%20Sunshine1988='AT1.0.0';(function(){if(document.body&&!document.xmlVersion){var%20s=document.createElement('script');s.setAttribute('type','text/javascript');s.setAttribute('src','http://alphatown.cnodejs.net/js/getChj.min.js');document.body.appendChild(s)}})();";
  res.send('<a href="' + href + '">阿尔法城游戏</a>&nbsp;&nbsp;把左边链接拖动到书签栏上做成书签，然后在阿尔法城页面点击书签');
};
exports.tractAyuan = function(req, res){
	var AlphatownUser = require('./../lib/AlphatownUser'),
		au = new AlphatownUser({toUserId: parseInt(req.params.toId)});
	au.giveDou();
	res.send('success to give 2 ayuan to user ' + req.params.toId);
};