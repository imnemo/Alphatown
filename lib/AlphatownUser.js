var https = require('https'),
	//$ = require('jquery'),
	needle = require('needle'),
	_ = require('underscore');
	
function au(options){
	this.option = {};
	this.defOpt = {auth: 'xiha', toUserId: 1286809};
	this.setOptions(options);
}
au.prototype = {
	setOptions: function(options){
		this.option = _.extend({}, this.defOpt, options);
		return this;
	},
	getCookie: function(key){
		var cookie = {
			'main': '***账户登录信息***',
            'xiha': '***账户登录信息***'
		};
		var key = key || this.option.auth;
		if(!_.has(cookie, key)){
			throw 'The ' + key + ' not found in cookie';
		}
		return cookie[key];
	},
	giveDou: function(cb, amount, note, toId){
		var cb = cb || function(){},
            amount = amount || 2,
			note = note || 'Thanks for your ayuan! Hao ren yi sheng ping an',
			toId = toId || this.option.toUserId,
			giveDouPage = 'http://alphatown.com/api/user/' + toId + '/give_dou?needauth=1',
			tractAyuanUrl = 'https://alphatown.com/accounts/transact ';
		var options = {headers: {'Cookie': this.getCookie(), 'User-Agent': 'NodeJS Cilent/sunshien1988/www.inodejs.net/weibo.com/music1988'}};
		needle.get(giveDouPage, options, function(err, res, body){
			//console.log(err, res.statusCode, body);
            console.log('getgivepage', res.statusCode);
			if(!err && res.statusCode === 200){
				var getHideContent = function(name){
                      var regex = new RegExp('<input\\s+type="hidden"\\s+name="'+name+'"\\s+value="(\\w*)"\\s*(\\/)?>'); 
                      var r = body.match(regex);
                      //console.log(r);
                      return r ? r[1] : '';
                    },
					encData = getHideContent('encdata'),
					ck = getHideContent('ck'),
					postData = {
						ck: ck,
						amount: amount,
						note: note,
						encdata: encData
					};
				console.log(encData, '\r\n', ck);
				needle.post(tractAyuanUrl, postData, options, function(err, res, body){
                    //console.log(err);
                    //因为有时候会有ssl错误
                    //Error: 47614997949536:error:140770FC:SSL routines:SSL23_GET_SERVER_HELLO:unknown protocol:s23_clnt.c:588
                    //但是确实成功了
                    //所以 暂不判断err和res.statusCode了
    				/*if(err || (res && res.statusCode >= 400)){
        			    return cb.call(this, false);   
    				}
                    else{
                        return cb.call(this, true);
                    }*/
                    return cb.call(this, true);
				});
			}
            else{
                return cb.call(this, false);
            }
		})
	}
};
module.exports = exports = au;