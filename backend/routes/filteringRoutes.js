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
}