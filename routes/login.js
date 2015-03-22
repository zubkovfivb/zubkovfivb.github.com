var express = require('express');
var passport = require('passport');
var router = express.Router();
var user = require('../models/user');

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login'});
});

router.post('/',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'})
);

//router.post('/', function(req, res, next) {

//    var user1 = new user({name: req.body.name, password: req.body.password});
//
//    user1.save(function(err){
//        if(err){
//            console.log(err);
//        } else {
//            res.redirect('/users');
//        }
//    });
//});

module.exports = router;