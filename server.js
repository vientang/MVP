var express = require('express');
var bodyParser = require('body-parser'); // middleware to get data from forms. Express can't do this.
var app = express();

// urlencoded tells bodyParser to extract data from form element 
// and add them to body property in the request object
app.use(bodyParser.urlencoded({extended: true}) )

var port = 3000;

app.listen(port, function() {
	console.log('Serving up meal ideas on port ' + port);
})

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
})

app.post('/cuisines', function(req, res) {
	console.log(req.body);
})