var mongoose = require('mongoose');
var express= require('express');
var router = express.Router();
var session = require("express-session");

var Profile = mongoose.model('profiles');
var UserModel = mongoose.model("users");


router.get('/', function(req, res, next){
  console.log("user session: ---- ", req.session.user);
  // console.log("user session: ---- ", req.session.user.credentials.email);
  res.render('profile', { user: req.session.user });
});


router.post('/save', function(req, res, next) {
  console.log("ok !");
  Profile.findOneAndUpdate(
      { email: req.session.user.credentials.email },
      { userId: req.session.user._id,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        batchNumber: req.body.batchNumber,
        batchLocation: req.body.batchLocation,
        statusType: req.body.statusType,
        myDescription: req.body.myDescription,
        wantedJob: req.body.wantedJob,
        wanttoDo: req.body.wanttoDo,
        notwanttoDo: req.body.notwanttoDo
      },
      function (err, profile) {
        if(err){return res.status(422).send("error when updating profile")};
        console.log("profile: --",profile);
        UserModel.findOneAndUpdate(
         { id: req.session.user._id },
         { email: req.body.email },
         function(err, user){
          if(err){return res.status(422).send("error when updating user")};
          res.send("okokok");
         });
    }
  );
});

// Affichage de la page pool-profile

module.exports = router;
