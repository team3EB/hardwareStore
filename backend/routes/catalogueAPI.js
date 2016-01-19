/**
 * Created by alexadam on 19.01.16.
 */

var Item  = require('../models/item');
var imgPath = 'sample.jpg';
var Order  = require('../models/order');

module.exports=function(app){


app.get('/api/catalogue', function(req, res) {
    console.log("im in server get");
    console.log(req.headers);
    Item.find(function(err, items) {

        if (err)
            res.send(err);

        res.json(items);
    });
});



    app.post('/api/catalogue', function(req, res){
        console.log(req.body);

        Item.create({
            name: req.body.name,
            description: req.body.description,
            weight : req.body.weight,
            stock : req.body.stock,
            price : req.body.price,
            cathegory : req.body.cathegory
        });

        Item.find(function(err, items) {
            if (err)
                res.send(err)
            res.json(items);
        });
    });

    app.get('/api/catalogue/:id', function(req, res) {
        var response = {};
        console.log(req.headers);

        Item.findById(req.params.id,function(err,data){
            // This will run Mongo Query to fetch data based on ID.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {

            }
            res.json(data);
        });
    });



    app.put('/api/catalogue/:item_id', function(req,res){

        return Item.findById(req.params.item_id, function (err, item) {
            item.name =  req.body.name;
            item.description = req.body.description;
            item.weight = req.body.weight;
            item.stock = req.body.stock;
            item.price = req.body.price;
            return item.save(function (err) {
                if (!err) {
                    console.log("updated");
                } else {
                    console.log(err);
                }
                return res.send(item);
            });
        });


    });

    app.delete('/api/catalogue/:item_id', function(req, res) {
        Item.remove({
            _id : req.params.item_id
        }, function(err, item) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Item.find(function(err, items) {
                if (err)
                    res.send(err)
                res.json(items);
            });
        });
    });


}