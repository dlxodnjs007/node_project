const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   console.log("router get /");
//   // res.render('main');
// });

router.get("/", userController.home);

module.exports = router;


