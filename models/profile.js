var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
    userId: String,
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

mongoose.model('profiles', profileSchema);
