/**
 * Created by alexadam on 26.12.15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Order = new Schema({
    User_id : String,
    items : { type : Array , "default" : [] },
    order_address : {
        receiver : String,
        street : String,
        zip : Number,
        city : String,
        country : String
    },
    payment : false
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Order', Order);
