var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var config = require("./config");

var fileUpload = require ('express-fileupload');

var mongoose = require("mongoose");

var options = { server: { socketOptions: { connectTimeoutMS: 5000 } } };
mongoose.connect(
  config.mongoURI,
  options,
  function(err) {
    console.log(err);
  }
);

require("./models/User");

var index = require("./routes/index");
var users = require('./routes/users');
var profile = require('./routes/profile');
var pool_profile = require('./routes/pool_profile');

var app = express();

app.use(fileUpload());

// use of the express session
app.use(
  session({
    secret: "a4f8071f-c873-4447-8ee2",
    resave: false,
    saveUninitialized: false
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/profile', profile);
app.use('/pool_profile',pool_profile)
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;
