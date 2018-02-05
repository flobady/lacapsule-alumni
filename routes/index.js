var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile', function(req, res, next) {
  res.render('profile', );
});

router.get('/login', function(req, res, next) {
  res.render('login', );
});

router.get('/trombinoscope', function(req, res, next) {
  res.render('trombinoscope', );
});

module.exports = router;
