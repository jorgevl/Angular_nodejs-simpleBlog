//DEFINITIONS
//Express 4+
var express = require('express');
//var multer  = require('multer');
//var upload = multer({ dest: 'uploads/' });
//var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger  = require("eazy-logger").Logger({
    prefix: "{blue:[}{magenta:easy-logger}{blue:] }",
    useLevelPrefixes: true
});
//App
var app = express();
//Mongo
var mongoose 	= require('mongoose');


//CONFIG
//Connection to mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/angular-blog', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});
//Static htmls path
app.use(express.static(__dirname + '/public'));
//POST handling					
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//DELETE/PUT simulation				
app.use(methodOverride());					
//Mongo model definition (just a string)
var Entry = mongoose.model('Entry', {
	text: String
});
//Mappings
//Lists all entries
app.get('/api/list', function(req, res) {				
	Entry.find(function(err, entries) {
		if(err) {
			res.send(err);
		}
		res.json(entries);
	});
});
//Creates an entry and list all entries
app.post('/api/add', function(req, res) {				
	Entry.create({
		text: req.body.text,
		done: false
	}, function(err, entry){
		if(err) {
			res.send(err);
		}

		Entry.find(function(err, entries) {
			if(err){
				res.send(err);
			}
			res.json(entries);
		});
	});
});
//Deletes an entry and list all entries
app.delete('/api/delete/:entry', function(req, res) {		
	Entry.remove({
		_id: req.params.entry
	}, function(err, entry) {
		if(err){
			//res.send(err);
		}

		Entry.find(function(err, entries) {
			if(err){
				res.send(err);
			}
			res.json(entries);
		});

	})
});
//Loads the index page
//Angular will handle all the front
app.get('*', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

//Server start on 8080
app.listen(8080, function() {
	logger.info('App listening on port 8080');
});