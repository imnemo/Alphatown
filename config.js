/***
 * 如果开启了mongoDB,将下面代码注释去掉，
 * 并将dbUserName, dbPassword和dbName都
 * 替换成分配得到的值。即可查看 mongoDB
 * 测试程序。否则则开启hello world程序。
 ***/
var mongo = require("mongoskin");
var db_url = exports.db_url = "fksVCebY3Ice:QgvGbqryrX@127.0.0.1:20088/BjUEUDIJPUec";
exports.db = mongo.db(db_url);
var conf = {}, env = 'pro';
conf.dev = {
    staticBaseUrl: 'http://alphatown.dev.cnodejs.net/dev/'
};
conf.pro = {
    staticBaseUrl: 'http://alphatown.cnodejs.net/'
};
exports.env = env;
exports.conf = conf;
