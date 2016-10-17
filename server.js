var express = require('express');
var bodyParser = require('body-parser'); // middleware to get data from forms. Express can't do this.
var MongoClient = require('mongodb').MongoClient;
var app = express();
var db;

// urlencoded tells bodyParser to extract data from form element 
// and add them to body property in the request object
app.use(bodyParser.urlencoded({extended: true}) )
var port = 3000;

// use ejs templating engine to add dynamic content to html
app.set('view engine', 'ejs');

MongoClient.connect('mongodb://admin:123@ds029665.mlab.com:29665/what-to-eat', function(err, database) {
	if (err) return console.log(err);
	db = database;
	app.listen(port, function() {
		console.log('Serving up meal ideas on port ' + port);
	})
})
// database user: admin
// database password: 123


app.get('/', function(req, res) {
	db.collection('cuisinetypes').find().toArray(function(err, result) {
		if (err) return console.log(err);
		console.log(result);
		res.render('index.ejs', {cuisinetypes: result});
	});
})

app.post('/cuisinetypes', function(req, res) {
	db.collection('cuisinetypes').save(req.body, function(err, result) {
		if (err) return console.log(err);
		console.log('your meal idea was saved to the database');
		res.redirect('/');	
	})
})

	