// server.js - this is the main node file, and it will setup and store all of the apps configuration

// setup express app and mongoose for mongoDB
var express  = require('express');
var app      = express();						
var mongoose = require('mongoose');

// configure and connect to the mongoDB database hosted on modulus.io
mongoose.connect('mongodb://ajfUs3rs:heMDvCjCx3@novus.modulusmongo.net:27017/usEry4vi');

// configure the express application
app.configure(function(){
	app.use(express.static(__dirname+'/public')); // set the public view for users
	app.use(express.logger('dev'));               // log every request to the console
	app.use(express.bodyParser()); 				  // pull information from html in POST
});

// define model
var User = mongoose.model('User', {
	name     : String,
	email    : String,
	password : String,
});

// express routes to handle API calls

// get all users
app.get('/api/users', function(req, res) {
	// use mongoose to get all users in the database
	User.find(function(err, users) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will run
		if (err) {
			res.send(err);			
		}
		
		res.json(users); // return all users in JSON format
	});
});

// create a user and send back all the users
app.post('/api/users', function(req, res){
	// create a user, information comes from AJAX request from Angular
	User.create({
		name     : req.body.name,
		email    : req.body.email,
		password : req.body.password,
		done     : false,
	}, 
	function(err, user){
		if (err) {
			res.send(err);
		}
		
		// create user and return all users
		User.find(function(err, users){
			if (err) {
				res.send(err);
			}
			
			res.json(users);
		});
	});
});

// listen on port 1408
app.listen(1408);
console.log("Application listening on port 1408");