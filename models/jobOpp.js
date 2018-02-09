const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema({
  postedBy: String,
  postDate: String,
  jobTitle: String,
  jobCompany: String,
  jobCity: String,
  jobSalary: String,
  jobContractType: String,
  jobExperience: String, // new ajout expérience minimum
  jobResume: String, // new ajout résumé du poste
  jobInfo: String,
  jobContact: String, // new ajout
  jobReference: String // new ajout
});

mongoose.model("jobs", jobSchema);
