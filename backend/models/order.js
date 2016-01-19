/**
 * Created by alexadam on 26.12.15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Order = new Schema({
    order_date : Date,
    User_id : String,
    items : { type : Array , "default" : [] },
    shipping_address : {
        name : String,
        address : String,
        city : String,
        zip : Number,
        country : String
    }

});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Order', Order);
