var data = {
        isDev: '.min',
        baseUrl: 'http://alphatown.cnodejs.net/',
        title: '抽奖游戏',
        subTitle: 'Stay foolish, stay hungry! -- 风流涕淌鱼小木说乔帮主说过这话'
    },
    utity = require('./../lib/Utility'),
    rData = {errno: 0, data: ''},
    config = require('./../config'),
    db = config.db,
    dbChj = db.collection("chj"), dbChjLog = db.collection('chj_log');
    AlphatownUser = require('./../lib/AlphatownUser'), au = new AlphatownUser(),
    chjSpendNum = 2, giveDouNote = '块大洋！';
    chjResultInfo = {num0: '真该去买彩票了', num1: '莫灰心', num2: '不赔不赚', num3: '时来运转', num4: '点儿开始正了', num5: '小爆人品', num6: '点儿忒正了', num7: '人品小爆发', num8: '犹如神助', num9: '九九归真', num10: '怎么可能'};
function setRData(errno, data){
    var errInfo = {
         err10000: 'success',
         err10010: '请求非法'
    };
    rData.errno = errno;
    rData.data = data || errInfo['err'+errno] || '';
}
exports.index = function(req, res){
    res.render('choujiang.html', data);
}
exports.go = function(req, res){
    var param = req.query;
    if(!utity.checkObjHash(param)){
        setRData(10010);
        res.json(rData);
        return false;
    }
    dbChj.findOne({id: param.id}, function(err, item){
        if(!item){
            item = {};
            item.id = param.id;
            item.name = param.name;
            item.spendNum = 0;
            item.getNum = 0;
        }
        console.log(item);
        switch(param.type){
            case 'normal':
                var max = chjSpendNum + 1 + parseInt(item.spendNum) - parseInt(item.getNum);
                max = max > 10 ? 10 : max;
                console.log(max);
                var amount = Math.ceil(Math.random() * max);
                console.log('getNum', amount);
                au.giveDou(function(err){
                    var log = {
                        uId: item.id, uName: item.name, ts: param.ts, type: param.type, success: 0, getNum: 0
                    };
                    if(!err){
                        console.log('err?????');
                        dbChjLog.insert(log);
                        amount = 0;
                    }
                    item.spendNum += chjSpendNum;
                    item.getNum += amount;
                    dbChj.save(item);
                    if(amount){
                        log.success = 1;
                        log.getNum = amount;
                        dbChjLog.insert(log);
                    }
                    
                    setRData(10000, {getNum: amount, info: chjResultInfo['num'+amount]});
                    res.json(rData);
                }, amount, chjResultInfo['num'+amount] + ' ,' + amount + giveDouNote, item.id);
                break;
            case 'checkin':
                break;
            default:
                break;
        }
    });
}