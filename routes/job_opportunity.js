var express = require('express');
var router = express.Router();

router.post('/jobopp/add', function(req, res, next) {


  res.render('index', { title: 'Express' });
});
