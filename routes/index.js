var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/main', function(req, res, next) {
	res.render('main/main.html')
});
router.get('/gallery', function(req, res, next) {
	res.render('main/gallery.html')
});
router.get('/typography', function(req, res, next) {
	res.render('main/typography.html')
});

module.exports = router;
