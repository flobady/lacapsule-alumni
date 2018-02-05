var mongoose= require('mongoose');



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
