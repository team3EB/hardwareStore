/**
 * Created by alexadam on 19.01.16.
 */


var Item  = require('../models/item');
var User  = require('../models/user');
var express  = require('express');
var fs = require('fs');
var https = require('https');
var config = require('../models/config');
var User  = require('../models/user');
var Item  = require('../models/item');
var Order  = require('../models/order');
var app = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var jwt = require('jsonwebtoken');

module.exports=function(app){

    var apiRoutes = express.Router();

    apiRoutes.post('/authenticate', function(req, res) {

        console.log('im in authefication');
        User.findOne({name: req.body.name}, function (err, user) {
            if (err) {
                console.log(err);
                return res.send(401);
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            }

            user.comparePassword(req.body.password, function(isMatch) {
                if (!isMatch) {
                    console.log("Attempt failed to login with " + user.username);
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    return res.send(401);
                }

                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                return res.json({success: true,
                    message: 'Enjoy your token!',
                    token: token});
            });

        });
    });

// route middleware to verify a token
    apiRoutes.use(function(req, res, next) {

        // check header or url parameters or post parameters for token
        console.log(req.headers);

        var token = req.body.token || req.query.token || req.headers['x-access-token'];


        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    });

    apiRoutes.get('/', function(req, res) {
        res.json({ message: 'Welcome to the coolest API on earth!' });
    });

    apiRoutes.get('/users', function(req, res) {
        User.find({}, function(err, users) {
            res.json(users);
        });
    });

    apiRoutes.post('/orders', function(req, res) {
        var today = new Date().toISOString().
            replace(/T/, ' ').      // replace T with a space
            replace(/\..+/, '');
        console.log(req.body);


        Order.create({
            order_date: today,
            User_id : req.body[0].user_id,
            items: req.body[1],
            shipping_address : {
                name: req.body[0].name,
                address : req.body[0].address,
                city : req.body[0].city,
                zip : req.body[0].zip,
                country : req.body[0].country
            }
        });

        res.json({ success: true });

    });

    apiRoutes.put('/users/:id', function(req, res) {

        return User.findById(req.params.id, function (err, user) {
            user.name =  req.body.name;
            return user.save(function (err) {
                if (!err) {
                    console.log("updated");
                } else {
                    console.log(err);
                }
                return res.send(user);
            });
        });

    });

    apiRoutes.delete('/users/:id', function(req, res) {
        User.remove({
            _id : req.params.id
        }, function(err) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            User.find(function(err, users) {
                if (err)
                    res.send(err)
                res.json(users);
            });
        });
    });

    apiRoutes.get('/users/:id', function(req, res) {

        console.log(req.headers);

        User.findById(req.params.id,function(err,data){
            // This will run Mongo Query to fetch data based on ID.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {

            }
            res.json(data);
        });

    });

    app.use('/api', apiRoutes);


}