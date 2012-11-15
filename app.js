
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , chj = require('./routes/chj')
  , http = require('http')
  , path = require('path')
  , ejs = require('ejs');
var app = express();
app.configure(function(){
  app.set('port', 80);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.engine('html', ejs.renderFile);
  app.use(function(req, res, next){
    res.set({'Access-Control-Allow-Origin': 'http://alphatown.com'});
    next();
  });
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});
app.configure('development', function(){
  app.use(express.errorHandler());
});
app.get('/', routes.index);
app.get('/users', user.list);
//app.get('/user/tractAyuan/:toId', user.tractAyuan);
app.get('/choujiang', chj.index);
app.get('/choujiang/do', chj.oder);
app.get('/choujiang/go', chj.go);
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
