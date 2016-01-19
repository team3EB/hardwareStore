/**
 * Created by alexadam on 19.01.16.
 */

var User  = require('../models/user');
var Item  = require('../models/item');
var Order  = require('../models/order');

module.exports=function(app){

    app.get('/api/orders', function(req, res) {
        console.log("im in server get");
        console.log(req.headers);
        Order.find(function(err, orders) {

            if (err)
                res.send(err);

            res.json(orders);
        });
    });

    app.get('/api/orders/:id', function(req, res) {
        var response = {};
        console.log(req.headers);

        Order.findById(req.params.id,function(err,data){
            // This will run Mongo Query to fetch data based on ID.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {

            }
            res.json(data);
        });
    });
}
