var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('hardstore',['hardstore']); // первая - модуль монго второе - какую базу данных


app.use(express.static(__dirname + '/public'));



app.get('/items', function(req,res){
    console.log("i recieve a get request");

    db.hardstore.find(function(err,docs){
        console.log(docs);
        res.json(docs);
    });


});
app.get('*', function(req, res) {
    res.sendfile('/public/index.html', {'root': '../'});
});




app.listen(3000);
console.log("server run port 3000");