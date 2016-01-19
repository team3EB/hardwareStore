/**
 * Created by alexadam on 19.01.16.
 */

var Item  = require('../models/item');
var User  = require('../models/user');
var Order  = require('../models/order');

module.exports=function(app){

    app.get('/setup', function(req, res) {

        // create a sample user
        var nick = new User({
            name: 'admin',
            password: 'admin',
            role: 'admin'
        });

        // save the sample user
        nick.save(function(err) {
            if (err) throw err;

            console.log('User saved successfully');
            res.json({ success: true });
        });
    });

    app.get('/setupb2b', function(req, res) {

        // create a sample user
        var nick = new User({
            name: 'b2b',
            password: 'b2b',
            role: 'b2b'
        });

        // save the sample user
        nick.save(function(err) {
            if (err) throw err;

            console.log('User saved successfully');
            res.json({ success: true });
        });
    });

    app.get('/sampleorder', function(req, res) {

        // create a sample user
        var sampleOrder = new Order({
            User_id: '567def5a692295152c36e8f3',
            "items":[
                {"id":"569795e6a29e92b60c8de3d2"},
                {"id":"569acb29d8fd47c4099e7777"},
            ]
        });

        // save the sample user
        sampleOrder.save(function(err) {
            if (err) throw err;

            console.log('Order saved successfully');
            res.json({ success: true });
        });
    });


}
