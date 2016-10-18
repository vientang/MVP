var express = require('express');
var bodyParser = require('body-parser'); // middleware to get data from forms. Express can't do this.
var MongoClient = require('mongodb').MongoClient;
var app = express();
var db;

var port = 3000;

MongoClient.connect('mongodb://admin:123@ds029665.mlab.com:29665/what-to-eat', function(err, database) {
	if (err) return console.log(err);
	db = database;
	app.listen(port, function() {
		console.log('Serving up meal ideas on port ' + port);
	})
})
// database user: admin
// database password: 123

// urlencoded tells bodyParser to extract data from form element 
// and add them to body property in the request object
app.use(bodyParser.urlencoded({extended: true}) )

// middleware to tell express to make this folder public 
app.use(express.static('public'));
// middleware to read JSON data
app.use(bodyParser.json());

// use ejs templating engine to add dynamic content to html
// app.set('view', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	db.collection('mealideas').find().toArray(function(err, result) {
		if (err) return console.log(err);
		console.log(result);
		res.render('index.ejs', {mealideas: result});
	});
})

app.get('/findAnother', function(req, res) {
	db.collection('mealideas').find().toArray(function(err, result) {
		if (err) return console.log(err);
		console.log(result);
		res.render('index.ejs', {mealideas: result});
	});
})

// Code to allow user to post a category
// app.post('/findAnother', function(req, res) {
// 	var cursor = db.collection('mealideas').find();
// 	db.collection('mealideas').save(req.body, function(err, result) {
// 		if (err) return console.log(err);
// 		console.log('your meal idea was saved to the database');
// 		res.redirect('/');	
// 	})
// })

// Code to update a meal entry on database
// app.put('/mealideas', function(req, res) {
// 	db.collection('mealideas')
// 		.findOneAndUpdate(
// 			// filter mealideas by name
// 			{name: American},
// 			{
// 				$set: {
// 					name: req.body.name,
// 					idea: req.body.idea
// 				}
// 			}, 
// 			{sort: {_id: -1}},
// 			function(err, result) {
// 				if (err) return console.log(err);
// 				res.send(result);
// 			} 
// 	)
// });






















