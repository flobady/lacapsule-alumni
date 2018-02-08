var mongoose = require('mongoose');
var express= require('express');
var fileUpload = require('express-fileupload');
var router = express.Router();
var session = require("express-session");
var requireLogin = require('../middlewares/requireLogin');

var UserModel = mongoose.model("users");

router.get('/', requireLogin, function(req, res, next){
  console.log("la session du user -- ", req.session.user);
  res.render('profile', { user: req.session.user });
});

router.post('/save', function(req, res, next) {
  console.log("le user id est", req.session.user._id);
  console.log("la requete est:---", req.body);
UserModel.findOneAndUpdate(
    { _id: req.session.user._id },
    { lastName: req.body.lastName,
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
    function (err, user) {
      console.log("uuuu", user);
      if(err){return res.status(422).send(err)};
      UserModel.findOne(
        { _id: req.session.user._id }, function(err, user){
          console.log("user est maintenant : --",req.session.user);
          req.session.user = user;
          res.render('profile', { user: req.session.user });
        })
      })
});

// Affichage de la page pool-profile

router.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  var sampleFile = req.files.sampleFile;
  var filename = req.session.user._id;
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./public/images/' + filename + '.png', function(err) {
    if (err)
      return res.status(500).send(err);
    res.render('profile', { user: req.session.user });
  });
});

module.exports = router;
