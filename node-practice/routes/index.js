var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render("../views/home/home.ejs");

});

router.get('/contact', function (req, res, next) {
  res.render("../views/home/contact.ejs");

});

module.exports = router;
