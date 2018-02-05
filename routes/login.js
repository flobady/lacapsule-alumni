// START HOME EXPRESS
var express = require("express");
var router = express.Router();

// Initialisation du module dans le projet
var mongoose = require("mongoose");

var UserModel = mongoose.model("users");

// Enregistrer un document
router.post("/signup", function(req, res, next) {
  console.log("email");
  var newUser = new UserModel({
    // C'est parti!
    email: req.body.email,
    password: req.body.password
  });
  // Ecriture des données
  newUser.save(function(error, user) {
    console.log(user);
    res.render("login");
  });
});

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("login");
});

module.exports = router;
