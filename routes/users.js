var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/signinup', function(req, res, next) {
  res.render('login',);
});

module.exports = router;
