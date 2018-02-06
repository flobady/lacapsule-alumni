var mongoose = require('mongoose');
var express= require('express');
var router = express.Router();


var Profile = mongoose.model('profiles');

router.get('/', function(req, res, next){
  res.render('profile',);
});


router.post('/save', function(req, res, next) {
  console.log("ok !");
  Profile.findOneAndUpdate(
      { email: req.body.email },
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
      function (err, profile) {
        console.log("ok c'est updaté");
        res.send("okokok");
    }
  );
});

// Affichage de la page pool-profile

module.exports = router;
