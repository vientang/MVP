var express = require('express');
var bodyParser = require('body-parser'); // middleware to get data from forms. Express can't do this.
var MongoClient = require('mongodb').MongoClient;
var session = require('express-session');
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

// use ejs templating engine to add dynamic content to html
app.set('view engine', 'ejs');
// urlencoded tells bodyParser to extract data from form element 
// and add them to body property in the request object
app.use(bodyParser.urlencoded({extended: true}) )
// middleware to read JSON data
app.use(bodyParser.json());
// middleware to tell express to make this folder public 
app.use(express.static('public'));
app.use(session({secret: 'food'}));

// middleware to check user session
var checkUser = function(req, res, next) {
	if (req.session.active === undefined) {
		res.redirect('/login');
	} else {
		next();
	}
}

// handle logins and signups
app.get('/', checkUser, function(req, res) {
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

app.get('/login', function(req, res) {
	res.render('login.ejs');
})

app.get('/signup', function(req, res) {
  res.render('signup.ejs');
});


// User log in 
app.post('/login', function(req, res) {
  db.collection('users').find({ username: req.body.username}).then(function(found) {
    if (found) {
      req.session.active = true;
      res.redirect('/');
    } else {
      res.status(301);
      res.redirect('/login.ejs');
    }
  });
});

// User sign up
app.post('/signup', function(req, res) {
  db.collection('users').save({ username: req.body.username, password: req.body.password}).fetch().then(function(found) {
    if (found) {
      res.redirect('/login.ejs');
    } else {
      Users.create({
        username: req.body.username,
        password: req.body.password
      })
      .then(function(newUser) {
        res.status(200);
        req.session.active = true;
        res.redirect('/');        
      });
    }
  });
});



















