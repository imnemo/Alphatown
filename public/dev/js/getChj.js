(function(w, d, $){
    var appSunshine = window.appSunshine || {},  //应用全局变量，与其他模块通信
    	$dashBoard = $('.dashboard'),
		uId = $dashBoard.find('.userbar .myinfo span[data-user-id]').data('user-id'),
        uName = $dashBoard.find('.loginbar a.link-node').text().slice(0, -2),
		$pinfo, $pOpt,
		$myMenu,
		$menuLinkCommon = $('<a>').attr('href', '#').addClass('transfer-dou').off('click'),
		$choujiang, $toBe,
		$mask, $appDialog, $loading, $closeDialog,
		zIndex = $dashBoard.css('zIndex') - 10;
        
    appSunshine.config = {
        baseUrl: 'http://alphatown.dev.cnodejs.net/',
        //baseUrl: 'http://alphatown.cloudfoundry.com/',
    	chjIndex: 'choujiang',
		chjDo: 'choujiang/do',
		chjGo: 'choujiang/go'  	
	};
    appSunshine.choujiang = {};
    appSunshine.appDialog = {};
    appSunshine.uInfo = {};
	function init(){
		if(uId && !appSunshine.exit){
			$pinfo = $dashBoard.find('.place-info').first();
			$choujiang = $menuLinkCommon.clone().text('抽奖游戏');
			$toBe = $('<span>').text('更多游戏敬请期待...').css({'display': 'inline-block', 'padding': '4px 0 0 2px'});
			$myMenu = $pinfo.clone()
						.appendTo($pinfo.parent())
						.find('.shop-admin-btn').remove().end()
						.find('.info').empty().append('<h3><span>~~~鱼小木喊你来玩儿小游戏~~~</span></h3>').end()
						.find('.opt').empty().append($choujiang).append($toBe).end()
						.show().animate({'left':'+=' + (25 + $pinfo.width())}, {duration: 500, easing: 'linear'});
			
			$mask = $('<div>').attr('id', 'sunshine-mask').addClass('dui-mask').hide().css({'position': 'absolute', left: 0, top: 0, 'zIndex': zIndex, 'width': 10000, 'height': 10000}).appendTo('body');
			$appDialog = $('<div>').attr('id', 'sunshine-dialog').addClass('dui-dialog').hide().appendTo('body');
			$loading = $('<div>').attr('id', 'sunshine-loading').addClass('dui-dialog-loading').hide().css({'zIndex': 10000, 'height': '100%'}).appendTo('body');
			$choujiang.on('click', function(){
				if(appSunshine.choujiang.on === true){
					return false;
				}
				$mask.show();
				if(appSunshine.appDialog.type === 'choujiang'){
					$appDialog.trigger('show', 'choujiang');
				}
				else{
                    $loading.show();
					$.get(appSunshine.config.baseUrl + appSunshine.config.chjIndex, function(data){
                        $loading.hide();
						$appDialog.html(data);
                        appSunshine.onLoadApp('choujiang', 600);
                        $appDialog.trigger('show', 'choujiang');
					})
				}
				return false;
			});
            
			$appDialog.on('show', function(e, type){
                $(this).fadeIn();
                appSunshine[type].on = true;
			});
            $appDialog.on('hide', function(e, type){
                $(this).fadeOut(function(){
                    $mask.hide();
                    appSunshine[type].on = false;
                });
            });
            
            //对外暴露一些API，供其他模块使用
			appSunshine.exit = true;
            
            appSunshine.uInfo.id = uId;
            appSunshine.uInfo.name = uName;
            
			appSunshine.$myMenu = $myMenu;
            appSunshine.$appDialog = $appDialog;
            appSunshine.onLoadApp = function(type, appWidth){
                var type = type || 'choujiang';
                appSunshine.appDialog.type = type;
                $closeDialog = $appDialog.find('.dui-dialog-close').on('click', function(){
                    $appDialog.trigger('hide', 'choujiang');
                });
                var $dwrap = $appDialog.find('.dui-dialog-wrap');
                $dwrap.css({left: ($('body').width() - appWidth)/2, top: 200});
            }
            
            appSunshine.deps = {
                'CryptoJS': 'http://crypto-js.googlecode.com/svn/tags/3.0.2/build/rollups/md5.js'
            };
            appSunshine.loadDep = function(name, cb){
                var cb = cb || function(){};
                if(w[name]){
                    return cb.call(this, w[name]);
                }
                $.getScript(appSunshine.deps[name], function(){
                    return cb.call(this, w[name]);
                });
            }
            appSunshine.loadDep('CryptoJS', null);
            appSunshine.giveDou = function(cb, toId, amount, note){
                toId = toId || 1462645;
                amount = amount || 2;
                note = note || '获取抽奖机会一次，祝您好运！';
                var f=$("<iframe>").appendTo("body").hide().attr("src","http://alphatown.com/api/user/"+toId+"/give_dou?needauth=1"),
                    form, timer, num = 0;
                timer = setInterval(function(){
                    if(++num > 20){
                        cb.call(this, false);
                        clearInterval(timer);
                        timer = null;
                    }
                    form=f[0].contentWindow.document.getElementsByTagName("form")[0];
                    if(!form){
                        return;
                    }
                    clearInterval(timer);
                    timer = null;
                    num = 0;
                    form.amount.value=amount;
                    form.note.value=note;
                    form.submit();
                    timer = setInterval(function(){
                        if(++num > 20){
                            cb.call(this, false);
                            clearInterval(timer);
                            timer = null;
                            //f.remove();
                        }
                        var $info = $(f[0].contentWindow.document).find('.box .bd');
                        if($info && $info.text().trim() == '恭喜！赠送成功'){
                            cb.call(this, true);
                            clearInterval(timer);
                            timer = null;
                            //f.remove();
                        }
                        else{
                            return;
                        }
                    }, 1000);
                },1000);
            }
            
			window.appSunshine = appSunshine;
		}
	}
	init();
})(window, document, $)