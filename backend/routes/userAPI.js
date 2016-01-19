/**
 * Created by alexadam on 19.01.16.
 */

var User  = require('../models/user');

module.exports=function(app) {


    app.post('/signup', function(req, res) {

        // create a sample user
        var user = new User({
            name: req.body.name,
            password: req.body.password,
            email : req.body.email
        });

        // save the sample user
        user.save(function(err) {
            if (err) throw err;

            console.log('User saved successfully');
            res.json({ success: true });
        });
    });




}