var crypto = require('./CryptoJS'),
    cp = require('crypto');
exports.getMD5 = function(str){
    return cp.createHash('md5').update(str, 'utf8').digest('hex');
}
exports.checkObjHash = function(obj, hashKey, addicialKey){
    //console.log(obj);
    var hashKey = hashKey || 'encData',
        addicialKey = addicialKey || 'ts',
        hash, hashTrans, encKey, tsOri, tsNow = new Date().getTime(), transTime;
    if(!obj[hashKey] || !obj[addicialKey]){
        return false;
    }
    hashTrans = obj[hashKey];
    tsOri = obj[addicialKey];
    encKey = tsOri.slice(-9);
    /*delete obj[hashKey];
    console.log(JSON.stringify(obj) + encKey);
    hash = exports.getMD5(JSON.stringify(obj) + encKey);*/
    hash = exports.getMD5(encKey);
    //console.log(hash, '\n', hashTrans);
    if(hash !== hashTrans){
        return false;
    }
    
    transTime = tsNow - parseInt(tsOri);
    //console.log(transTime);
    if(transTime > 10000){
        return false;
    }
    return true;
}