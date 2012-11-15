(function(w, d, $){
    var appSunshine = w.appSunshine, //直接操作暴漏出的appSunshine
        $appWrap = appSunshine.$appDialog,
        $doChj = $('#do-chj'),
        $chjBtnInfo = $('#chj-info'), btnOriClass = 'orange', btnChjDoingClass = 'green',
        chjDoingInfo = '抽奖进行时，上天保佑妈咪妈咪哄...';
    appSunshine.choujiang.doing = false;
    
    function goChj(type){
        var type = type || 'normal',
            postData, ts, encKey, encData;
        postData = {};
        postData.id = appSunshine.uInfo.id;
        postData.name = appSunshine.uInfo.name;
        postData.type = type;
        ts = new Date().getTime() + '';
        postData.ts = ts;
        encKey = ts.slice(-9);
        //console.log(postData);
        appSunshine.loadDep('CryptoJS', function(Crypto){
            //console.log(JSON.stringify(postData) + encKey);
            postData.encData = encData = Crypto.MD5(encKey).toString();
            //console.log(postData);
            $.get(appSunshine.config.baseUrl + appSunshine.config.chjGo, postData, function(d){
                console.log(d);
                $doChj.removeClass(btnChjDoingClass).addClass(btnOriClass);
                $chjBtnInfo.text(d.data.info + ' ，中了' + d.data.getNum + '块！敢不敢再来次？');
        	    appSunshine.choujiang.doing = false;
            }, 'json');
        });
    }
    $doChj.on('click', function(){
        if(appSunshine.choujiang.doing === true){
          	return false;
          }
        appSunshine.choujiang.doing = true;
        $doChj.removeClass(btnOriClass).addClass(btnChjDoingClass);
        $chjBtnInfo.text(chjDoingInfo);
        appSunshine.giveDou(function(result){
            if(result){
                goChj();
            }
            else{
                $doChj.removeClass(btnChjDoingClass).addClass(btnOriClass);
                $chjBtnInfo.text('获取抽奖机会未成功，加油再试一次！');
                appSunshine.choujiang.doing = false;
            }
        });
    });
    $doChj.focus();
})(window, document, $)