var utity = require('./../lib/Utility'),
    config = require('./../config'),
    data = {
        isDev: config.env === 'dev' ? '' : '.min',
        staticBaseUrl: config.conf[config.env].staticBaseUrl,
        title: '抽奖游戏',
        subTitle: 'Stay foolish, stay hungry! -- 风流涕淌鱼小木说乔帮主说过这话'
    },
    db = config.db,
    dbChj = db.collection("chj"), dbChjLog = db.collection('chj_log'), dbAyuanLog = db.collection('ay_log'),
    AlphatownUser = require('./../lib/AlphatownUser'), au = new AlphatownUser(),
    chjSpendNum = 2, giveDouNote = '块大洋！',
    chjResultInfo = {num0: '真该去买彩票了', num1: '莫灰心', num2: '不赔不赚', num3: '时来运转', num4: '点儿开始正了', num5: '小爆人品', num6: '点儿忒正了', num7: '人品大爆发', num8: '犹如神助', num9: '九九归真', num10: '怎么可能'};
function setRData(cb, errno, data){
    console.log('rData', data);
    var errInfo = {
             err10000: 'success',
             err10010: '请求非法'
        }, 
        rData = {errno: 0, data: ''},
        cb = cb || function(){};
    rData.errno = errno;
    rData.data = data || errInfo['err'+errno] || '';
    cb.call(this, rData);
}
exports.index = function(req, res){
    res.render('choujiang.html', data);
}
exports.go = function(req, res){
    var param = req.query, appendAmount = 1;
    if(!utity.checkObjHash(param)){
        setRData(function(rd){res.json(404, rd)}, 10010);
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
                dbAyuanLog.findOne({type: 'chj'}, function(err, ayLog){
                    if(!ayLog){
                        ayLog = {type: 'chj', num: 0};
                    }
                    var appendNum = appendAmount, 
                        max = chjSpendNum + appendNum + parseInt(item.spendNum) - parseInt(item.getNum), amount;
                    max = max < 0 ? 0 : max;
                    max = max > 7 ? 7 : max;
                    console.log(max);
                    if(ayLog.num >= 10){
                        ayLog.num = 0;
                        dbAyuanLog.save(ayLog);
                        appendNum = 6;
                        amount = Math.floor(Math.random() * appendNum) + 10 - appendNum;
                    }
                    else{
                        amount = Math.floor(Math.random() * max);   
                    }
                    console.log(amount);
                    au.giveDou(function(result){
                        var log = {
                            uId: item.id, uName: item.name, ts: param.ts, type: param.type, success: 1, getNum: 0
                        };
                        if(!result){
                            console.log('err?????');
                            log.success = 0;
                            amount = 0;
                        }
                        log.getNum = amount;
                        dbChjLog.insert(log);
                        item.spendNum += chjSpendNum;
                        item.getNum += amount;
                        dbChj.save(item);
                        
                        if(appendNum == appendAmount){
                            ayLog.num += chjSpendNum - amount;
                            dbAyuanLog.save(ayLog);
                        }
                        
                        setRData(function(rd){res.json(rd)}, 10000, {getNum: amount, info: chjResultInfo['num'+amount]});
                    }, amount, chjResultInfo['num'+amount] + ' ,' + amount + giveDouNote, item.id);
                });
                break;
            case 'checkin':
                break;
            default:
                break;
        }
    });
}