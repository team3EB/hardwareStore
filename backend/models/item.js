/**
 * Created by alexadam on 26.12.15.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var Item = new Schema({
    name : String,
    description : String,
    weight : Number,
    stock : Boolean,
    status : String,
    price : Number,
    category : String,
    image : {
        url : String
    }
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Item', Item);
