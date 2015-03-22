var express = require('express');
var router = express.Router();
var user = require('../models/user');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('signIn', { title: 'Sign In'});
});

router.post('/', function(req, res, next) {

    var user1 = new user({login: req.body.login, password: req.body.password});

    user1.save(function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect('/users');
        }
    });
});

module.exports = router;
