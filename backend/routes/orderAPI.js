/**
 * Created by andrefedorenko on 19.01.16.
 */

var Item  = require('../models/item');
var User  = require('../models/user');
var Order  = require('../models/order');

module.exports=function(app) {


    app.get('/api/order/:id', function (req, res) {
        var response = {};
        console.log(req.headers);

        Order.findById(req.params.id, function (err, data) {
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {

            }
            res.json(order);
        });
    });

    app.get('/api/orders', function (req, res) {
        console.log("im in server get");
        console.log(req.headers);
        Order.find(function (err, orders) {

            if (err)
                res.send(err);

            res.json(orders);
        });
    });


}