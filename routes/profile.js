var mongoose = require('mongoose');
var express= require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  res.render('profile',);
});


// router.post('/save', function(req, res, next) {
//   UserModel.find(
//       { email: req.body.email} ,
//       function (err, users) {
//         if(users.length == 0) {
//
//         var newProfile = new Profiles_Model ({
//           lastName: req.body.lastName,
//           firstName: req.body.firstName,
//           email: req.body.email,
//           batchNumber: req.body.batchNumber,
//           batchLocation: req.body.batchLocation,
//           statusType: req.body.statusType,
//           myDescription: req.body.myDescription,
//           wantedJob: req.body.wantedJob,
//           wanttoDo: req.body.wanttoDo,
//           notwanttoDo: req.body.notwanttoDo
//         });
//         newProfile.save(
//           function (error, user) {
//             req.session.user = user;
//             Profiles_Model.find(
//                  {user_id: req.session.user._id},
//                  function (error, ProfilesList) {
//                    res.render('index', { Profiles, user : req.session.user });
//                  }
//              )
//           }
//         );
//       } else {
//         res.render('index');
//       }
//     }
//   );
// });

module.exports = router;
