var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var requireLogin = require('../middlewares/requireLogin');
var session = require("express-session");

var User = mongoose.model('users');

router.get('/', function(req, res, next) {
  User.find({},
    function(err, list){
      res.render('page_profile', { user: req.session.user, userList: list } );
  });
});

router.get('/profile', requireLogin, function(req, res, next){
  console.log("la session du user -- ", req.session.user);
  res.render('profile', { user: req.session.user });
});

module.exports = router;
