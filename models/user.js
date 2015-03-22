var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    login    : {
        required: true,
        type: String,
        lowercase: true,
        unique: true

    },
    token    : String,
    name     : String,
    password : String
});

module.exports = mongoose.model('User', UserSchema);