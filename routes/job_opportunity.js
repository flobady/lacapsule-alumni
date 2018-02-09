// START HOME EXPRESS
var express = require("express");
var router = express.Router();

// Initialisation du module dans le projet
var mongoose = require("mongoose");

var JobModel = mongoose.model("jobs");

// Enregistrer un document
router.post("/publish", function(req, res, next) {
  console.log("postedBy");
  var newJob = new JobModel({
    // C'est parti!
    postedBy: req.body.postedBy,
    postDate: req.body.postDate,
    jobTitle: req.body.jobTitle,
    jobCompany: req.body.jobCompany,
    jobCity: req.body.jobCity,
    jobSalary: req.body.jobSalary,
    jobContractType: req.body.jobContractType,
    jobExperience: req.body.jobExperience,
    jobResume: req.body.jobResume,
    jobInfo: req.body.jobInfo,
    jobContact: req.body.jobContact,
    jobReference: req.body.jobReference
  });
  // Ecriture des données
  newJob.save(function(error, job) {
    console.log(job);
    // récup sur la base Mongo et affiche sur la même page
    JobModel.find(function(err, jobList) {
      console.log(jobList);
      res.render("job_opportunity", {
        jobList: jobList,
        user: req.session.user
      });
    });
  });
});

/* GET home page. */
router.get("/", function(req, res, next) {
  JobModel.find(function(err, job) {
    console.log(job);
    res.render("job_opportunity", { jobList: job, user: req.session.user });
  });
});

module.exports = router;
