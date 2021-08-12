var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render("../views/home/home.ejs");

});

router.get('/contact', function (req, res, next) {
  res.render("../views/home/contact.ejs");

});

router.get('/signup', function (req, res, next) {
  res.render("../views/home/signup.ejs");

});





module.exports = router;
