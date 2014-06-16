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

// listen on port 8080
app.listen(8080);
console.log("App listening on port 8080");