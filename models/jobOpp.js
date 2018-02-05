const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobOppSchema = new Schema ({
  postedBy: String,
  postDate: String,
  jobTitle: String,
  jobCompany: String,
  jobRegion: String,
  jobSalary: String,
  jobContractType: String,
  jobInfo: String
})

mongoose.model('users', userSchema);
