/**
 * Created by alexadam on 18.01.16.
 */

var Item  = require('../models/item');
module.exports=function(app) {

    app.get('/catalogue/cpu', function(req, res) {
        console.log("im in server get");
        console.log(req.headers);
        Item.find({'cathegory': "CPU" },function(err, items) {

            if (err)
                res.send(err);

            res.json(items);
        });
    });
    app.get('/catalogue/GPU', function(req, res) {
        console.log("im in server get");
        console.log(req.headers);
        Item.find({'cathegory': "GPU" },function(err, items) {

            if (err)
                res.send(err);

            res.json(items);
        });
    });
    app.get('/catalogue/MTBRD', function(req, res) {
        console.log("im in server get");
        console.log(req.headers);
        Item.find({'cathegory': "MTBRD" },function(err, items) {

            if (err)
                res.send(err);

            res.json(items);
        });
    });
    app.get('/catalogue/RAM', function(req, res) {
        console.log("im in server get");
        console.log(req.headers);
        Item.find({'cathegory': "RAM" },function(err, items) {

            if (err)
                res.send(err);

            res.json(items);
        });
    });

}