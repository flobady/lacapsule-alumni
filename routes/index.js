var express = require('express');
var router = express.Router();
var session = require("express-session");
var requireLogin = require('../middlewares/requireLogin');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("la session dans l'index ressemble à ---",req.session.user);
  res.render('index', { user: req.session.user });
});

// router.get('/profile', function(req, res, next) {
//   res.render('profile', );
// });
//
// router.get('/login', function(req, res, next) {
//   res.render('login', );
// });
//
// router.get('/trombinoscope', function(req, res, next) {
//   res.render('trombinoscope', );
// });


module.exports = router;
