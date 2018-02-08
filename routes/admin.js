// START HOME EXPRESS
var express = require("express");
var router = express.Router();
var session = require("express-session");
var requireLogin = require('../middlewares/requireLogin');


// Initialisation du module dans le projet
var mongoose = require("mongoose");
var ApprovedUserModel = mongoose.model("approvedUsers");


/* GET home page. */
router.get("/", requireLogin, function(req, res, next) {
  ApprovedUserModel.find({}, function(error, users){
    res.render("admin", { user: req.session.user, approvedUsers: users });
  })
});


router.post("/addUser", function(req, res, next) {
  var newApprovedUserModel = new ApprovedUserModel({
    email: req.body.email
  });
  newApprovedUserModel.save(function(error, newUser){
    if(error){return res.status(422).send("error when creating new approved user")};
    ApprovedUserModel.find({}, function(error, users){
      res.render("admin", { user: req.session.user, approvedUsers: users });
    })
  });
});

module.exports = router;
