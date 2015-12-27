/**
 * Created by alexadam on 23.12.15.
 * Sample server with nodeJS, test commit!!!!
 */

// server.js

// set up ========================
var express  = require('express');
var config = require('./models/config');
var User   = require('./models/user');
var Item    = require('./models/item');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var jwt = require('jsonwebtoken');



// configuration =================

var port = process.env.PORT || 8080;
mongoose.connect(config.database);     // connect to mongoDB database on modulus.io
app.set('superSecret', config.secret);
mongoose.connection.on('open', function (ref) {
    console.log('Connected to Mongo server...');
});

app.use(express.static(__dirname + '/../frontend'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//ITEMS ROUTES
app.get('/catalogue', function(req, res) {
    console.log("im in server get");
    Item.find(function(err, items) {

        if (err)
            res.send(err);

        res.json(items);
    });
});


app.post('/catalogue', function(req, res){
    console.log(req.body);

   Item.create({
       name: req.body.name,
       description: req.body.description,
       weight : req.body.weight,
       stock : req.body.stock,
       price : req.body.price
   });

    Item.find(function(err, items) {
        if (err)
            res.send(err)
        res.json(items);
    });
});

app.get('/catalogue/:id', function(req, res) {
    var response = {};

    Item.findById(req.params.id,function(err,data){
        // This will run Mongo Query to fetch data based on ID.
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {"error" : false,"message" : data};
        }
        res.json(response);
    });
});

app.delete('/catalogue/:item_id', function(req, res) {
    Item.remove({
        _id : req.params.item_id
    }, function(err, item) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, items) {
            if (err)
                res.send(err)
            res.json(items);
        });
    });
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


//SAMPLE USER FOR TESTING
app.get('/setup', function(req, res) {

    // create a sample user
    var nick = new User({
        name: 'Nick Cerminara',
        password: 'password',
    });

    // save the sample user
    nick.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
});

app.post('/signup', function(req, res) {

    // create a sample user
    var user = new User({
        name: req.body.name,
        password: req.body.password,
    });

    // save the sample user
    user.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
});


// API ROUTES -------------------
var apiRoutes = express.Router();

apiRoutes.post('/authenticate', function(req, res) {


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

app.use('/api', apiRoutes);


app.get('*', function(req, res) {
    res.sendfile('/../frontend/index.html');
});

process.on('uncaughtException', function(err) {
    console.log(err);
});

app.listen(8080);
console.log("App listening on port 8080");