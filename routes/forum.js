var express = require('express');
var router = express.Router();
var app = require('../app');
var mongoose = require('mongoose');
var requireLogin = require("../middlewares/requireLogin");

var Messages = mongoose.model('messages');
var Chats = mongoose.model('chats');

/* GET home page. */
router.get('/', requireLogin, function(req, res, next) {
  Chats.find({}, function(error, chats){
    console.log(chats);
    res.render('forum', {user: req.session.user, chats: chats });
  })
});

router.get('/chat', function(req, res, next) {
  console.log("le params est : ", req.query.id);
  Messages.find({
    chatId: req.query.id
  }, function(error, messages){
    console.log(messages);
    res.render('chat', {user: req.session.user, messages: messages });
  })
});

/* GET home page. */
router.get('/chat_add', function(req, res, next) {
  res.render('chat_add', { user: req.session.user });
});

router.post('/chat_add', function(req, res, next) {
  res.render('chat_add', { user: req.session.user });
});

module.exports = router;
