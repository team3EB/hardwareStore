/**
 * Created by alexadam on 26.12.15.
 */

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
SALT_WORK_FACTOR = 10;

var User = new Schema({
    name : { type: String, unique: true },
    surname : { type:String },
    role : { type:String },
    email : { type: String},
    password : { type: String},
    phone : { type: String},
    business : { type: Boolean},
    total_spent : { type: Number},
    orders_count : { type: Number},
    shipping_address : {
        name : String,
        surname : String,
        street : String,
        city : String,
        zip : Number,
        region : String,
        country : String
    },
    billing_address : {
        name : String,
        surname : String,
        street : String,
        city : String,
        zip : Number,
        region : String,
        country : String
    }
});

User.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

User.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(isMatch);
    });
};

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', User);