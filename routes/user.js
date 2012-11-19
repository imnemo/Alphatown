
/*
 * GET users listing.
 */
exports.list = function(req, res){
    var href = "javascript:var%20Sunshine1988='AT1.0.0';(function(){if(document.body&&!document.xmlVersion){var%20s=document.createElement('script');s.setAttribute('type','text/javascript');s.setAttribute('src','http://alphatown.cnodejs.net/js/getChj.min.js');document.body.appendChild(s)}})();";
  res.send('<a href="' + href + '">阿尔法城游戏</a>&nbsp;&nbsp;把左边链接拖动到书签栏上做成书签，然后在随便进入&nbsp;<a href="http://alphatown.com/shop/zodiac/" target="_blank">阿尔法城一个页面</a>&nbsp;点击书签，见证奇迹！！');
};