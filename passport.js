var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    user = require('./models/user');

//### strategy for login
passport.use(new LocalStrategy(
    {
        usernameField: 'name',
        passwordField: 'password'
    },
    function(username, password, done) {

        user.findOne({ name: username }, function(err, user) {

            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!validPassword(user.password, password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));
///// done strategy for login

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

function validPassword(userPassword, typedPassword){
    return userPassword === typedPassword;
}

module.exports = passport;