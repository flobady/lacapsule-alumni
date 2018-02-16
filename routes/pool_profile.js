var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var requireLogin = require('../middlewares/requireLogin');

var User = mongoose.model("users");

/* GET users listing. */
router.get("/", function(req, res, next) {
  console.log("route pool profile");
  User.find({}, function(err, list) {
    console.log("find pool profile");

    res.render("pool_profile", { user: req.session.user, userList: list });
  });
});

module.exports = router;
