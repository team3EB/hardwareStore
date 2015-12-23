/**
 * Created by alexadam on 23.12.15.
 * Sample server with nodeJS, test commit!!!!
 */

// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var amplify = require("amplify");

// configuration =================

mongoose.connect('mongodb://localhost/jsappdb');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


var Visitor = mongoose.model('Visitor', {
    name : String,
    date: Date,
    browserInfo: String
});

app.get('/api/visitors', function(req, res) {

    Visitor.find(function(err, visitors) {

        if (err)
            res.send(err);

        res.json(visitors);
    });
});


app.post('/api/visitors', function(req, res) {

    Visitor.create({
        name : req.body.text,
        date: req._startTime,
        browserInfo: req.headers['user-agent']

    }, function(err, visitor) {
        if (err)
            res.send(visitors);
    });

    Visitor.find(function(err, visitors) {
        if (err)
            res.send(err)
        res.json(visitors);
    });
});

app.get('*', function(req, res) {
    res.sendfile('/public/index.html', {'root': '../'});
});

app.listen(8080);
console.log("App listening on port 8080");

