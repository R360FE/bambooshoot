var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var ejs = require("ejs");
var fs = require("fs");

global.baseDir = __dirname;


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);  
app.set('view engine', 'html');
app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By",' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//配置路由
//var routes =require("./routes/routes");
//routes(app);

/*
* 根据不同的功能划分模块
* */
app.use('/', require('./routes/main'));
app.use('/mockdata', require('./routes/mockdata'));
app.use('/api/mockdata', require('./routes/mockdata_api'));


//接口mock数据返回
app.use(function(req,res,next){
  var filename = req.path.match(/\/?(\S+)/)[1];
  var mockdata_filename = filename.replace(/\//gi,"__");
 
  var fp = __dirname + '/mockdata/'+mockdata_filename+".json";
  fs.exists(fp, function (exists) {
    if(exists){
      //var data = require("./mockdata/"+filename+".json");
      
      var data = fs.readFileSync(fp);
      data = data.toString();
      data = JSON.parse(data);

      res.json(data);

    }else{
      next();
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) { 
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
