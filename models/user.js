var mongoose= require('mongoose');

var options = { server: { socketOptions: {connectTimeoutMS: 5000 } }};
mongoose.connect('mongodb://Victor:Momentum1992@ds225308.mlab.com:25308/lacapsule_alumni_profiles',
    options,
    function(err) {
     console.log(err);
    }
);

var Profiles_Schema = mongoose.Schema({
    lastName: String,
    firstName: String,
    email: String,
    batchNumber: Number,
    batchLocation: String,
    statusType: String,
    myDescription: String,
    wantedJob: String,
    wanttoDo: String,
    notwanttoDo: String

});

var Profiles_Model = mongoose.model('List_of_profiles', Profiles_Schema);

// Début des routes

router.post('/save', function(req, res, next) {

  UserModel.find(
      { email: req.body.email} ,
      function (err, users) {
        if(users.length == 0) {

        var newProfile = new Profiles_Model ({
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
        });
        newProfile.save(
          function (error, user) {
            req.session.user = user;
            Profiles_Model.find(
                 {user_id: req.session.user._id},
                 function (error, ProfilesList) {
                   res.render('index', { Profiles, user : req.session.user });
                 }
             )
          }
        );
      } else {
        res.render('index');
      }
    }
  );
});
