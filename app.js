var express = require('express');
var path = require('path');
var ejs = require('ejs');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var reload = require('reload');

var flash = require('connect-flash');
var log4js = require('log4js');
var app = express();

//log4js
log4js.configure('my_log4js_configuration.json',{});
var logger = log4js.getLogger('normal');
logger.setLevel('INFO');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//引用bower下的文件配置
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'ace')));
app.use(express.static(path.join(__dirname, 'data')));
app.use(log4js.connectLogger(logger, {level: 'auto', format:':method :url'}));

app.use(flash());

app.engine('.html', ejs.__express);
app.set('view engine', 'html');// app.set('view engine', 'ejs');

app.use('/', index);
app.use('/users', users);


// app.use(lessMiddleware('/less', {
//   dest: '/css',
//   pathRoot: path.join(__dirname, 'public'),
//   force:true,
//   debug:true
// }));

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

exports.logger=function(name){
    var logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
};

module.exports = app;
