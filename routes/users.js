// START HOME EXPRESS
var express = require("express");
var router = express.Router();
var session = require("express-session");

// Initialisation du module dans le projet
var mongoose = require("mongoose");

var UserModel = mongoose.model("users");
var ApprovedUserModel = mongoose.model("approvedUsers");

// Enregistrer un document
router.post("/signup", function(req, res, next) {
  ApprovedUserModel.findOne({
    email: req.body.email
  }, function(error, user){
    if(error){return res.status(422).send("error when finding authorized users")};
    if(user){
      var newUser = new UserModel({
        email: req.body.email,
        password: req.body.password,
        lastName: "",
        firstName: "",
        batchNumber: "",
        batchLocation: "",
        statusType: "",
        myDescription: "",
        wantedJob: "",
        wanttoDo: "",
        notwanttoDo: ""
      });
      // Ecriture des données
      newUser.save(function(error, user) {
        if(error){
            if(error.code === 11000 ) {
              res.render("login", {msg: {signupFail: "Email already in use"}})
            }
              else if(error){return res.status(422).send("error when creating new user")};
        }
        if(user){
          req.session.user = user;
          res.redirect("/");
        }
      });
    } else {
      res.render("login", {msg: {signupFail: "You must be an alumni to register"}});
    }
  });
});

/* GET home page. */
router.get("/logout", function(req, res, next) {
  req.session.user = null;
  res.render("index", { user: null });
});

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("login", { msg: null } );
});

// se connecter
router.post("/signin", function(req, res, next){
  console.log("nous cherchons le user avec le mail -- ", req.body.email);
  UserModel.findOne(
    { email: req.body.email,
      password: req.body.password
    },
    function(error, user) {
    console.log("nous avons trouvé le user --", user);
     if(user){
      req.session.user = {};
      req.session.user = user;
      console.log("le user est ",req.session.user);
      res.render("index", { user: req.session.user });
     }
     else
     {
        res.render("login", {msg: {signinFail: "Email or password invalid"}});
     }
    });
});

module.exports = router;
