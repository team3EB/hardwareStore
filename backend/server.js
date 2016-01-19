/**
 * Created by alexadam on 23.12.15.
 * Sample server with nodeJS, test commit!!!!
 */

// server.js

// set up ========================
var express  = require('express');
var fs = require('fs');
var https = require('https');
var config = require('./models/config');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var jwt = require('jsonwebtoken');
var filteringRoutes = require('./routes/filteringRoutes');
var catalogueAPI = require('./routes/catalogueAPI');
var userAPI = require('./routes/userAPI');
var cartAPI = require('./routes/cartAPI');
var samples = require('./routes/samples');
var protectedRoutes = require('./routes/protectedRoutesAPI');
var sendEmail = require('./routes/sendEmail');



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

filteringRoutes(app);
catalogueAPI(app);
userAPI(app);
cartAPI(app);
samples(app);
protectedRoutes(app);
sendEmail(app);

app.get('*', function(req, res) {
    res.sendfile('/../frontend/index.html');
});

process.on('uncaughtException', function(err) {
    console.log(err);
});

https.createServer({
    key: fs.readFileSync('./sslSert/key.pem'),
    cert: fs.readFileSync('./sslSert/cert.pem')
}, app).listen(8080);