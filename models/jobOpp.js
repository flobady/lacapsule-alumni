const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema({
  postedBy: String,
  postDate: String,
  jobTitle: String,
  jobCompany: String,
  jobRegion: String,
  jobSalary: String,
  jobContractType: String,
  jobInfo: String
});

mongoose.model("jobs", jobSchema);
