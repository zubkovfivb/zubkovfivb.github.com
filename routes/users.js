var express = require('express');
var router = express.Router();
var user = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    user.find({}, function (err, users) {
        res.render('users', { title: 'User List', users: users });
    });
});

module.exports = router;
