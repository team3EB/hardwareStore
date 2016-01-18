/**
 * Created by alexadam on 26.12.15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Order = new Schema({
    order_date : Date,
    User_id : String,
    items : { type : Array , "default" : [] },
    /*order_address : {
     receiver : String,
     street : String,
     zip : Number,
     city : String,
     country : String
     },*/
    payment : false,
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

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Order', Order);
