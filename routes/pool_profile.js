var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Profile = mongoose.model('profiles');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Profile.find({},
    function(err, list){
      res.render('pool_profile', { user: req.session.user, userList: list } );
  });
});

module.exports = router;
