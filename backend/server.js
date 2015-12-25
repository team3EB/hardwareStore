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

mongoose.connect('mongodb://localhost/hardstore');     // connect to mongoDB database on modulus.io

mongoose.connection.on('open', function (ref) {
    console.log('Connected to Mongo server...');
});
app.use(express.static(__dirname + '/../public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


var Item = mongoose.model('Item', {
    name : String,
    description: String,
    weight: Number,
    stock: Boolean,
    price: Number
});

app.get('/items', function(req, res) {
    console.log("im in server get");
    Item.find(function(err, items) {

        if (err)
            res.send(err);

        res.json(items);
    });
});

app.post('/items', function(req,res){
    console.log(req.body);
   Item.create({
       name: req.body.name,
       description: req.body.description,
       weight : req.body.weight,
       stock : req.body.stock,
       price : req.body.price
   })

    //db.hardstore.insert(req.body, function(err, doc){
      //  res.json(doc);
    //});
    //module.item = mongoose.model(req.body, Item);


});

/*
var Post = require('/items/post')
app.post('/items/posts', function (req, res, next) {
    var post = new Post({
        name: req.body.name,
        description: req.body.description,
        weight : req.body.weight,
        stock : req.body.stock,
        price : req.body.price

    })
    post.save(function (err, post) {
        if (err) { return next(err) }
        res.json(201, post)
    })
})
*/

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

