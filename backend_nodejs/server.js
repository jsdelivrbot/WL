var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db = require('./db');
var filmsController = require('./controllers/films');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/', function (req, res) {
    res.send('Hello API');
});

app.get('/films', filmsController.all);

app.get('/films/:id', filmsController.findById);

app.get('/films/title/:title', filmsController.findByTitle);

app.get('/films/stars/:star', filmsController.findByStar);

app.post('/films', filmsController.create);

app.put('/films/:id', filmsController.update);

app.delete('/films/:id', filmsController.delete);

app.post('/films/base', filmsController.createBase);



db.connect('mongodb://localhost:27017/filmApi', function (err) {
	
    if (err) {
        return console.log(err);
    }

    app.listen(3012, function () {
        console.log('API app started');
    });
});