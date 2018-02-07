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
    jobRegion: req.body.jobRegion,
    jobSalary: req.body.jobSalary,
    jobContractType: req.body.jobContractType,
    jobInfo: req.body.jobInfo
  });
  // Ecriture des données
  newJob.save(function(error, job) {
    console.log(job);
    res.render("job_opportunity");
  });
});

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("job_opportunity");
});

module.exports = router;
