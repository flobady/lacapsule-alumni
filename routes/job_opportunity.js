var express = require('express');
var router = express.Router();
var requireLogin = require('../middlewares/requireLogin');

router.get('/', function(req, res, next) {
  res.render('job_opportunity',);
});

module.exports = router;
