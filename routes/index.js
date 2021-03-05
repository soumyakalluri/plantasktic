var database = require('../public/database/test.json');
var fs = require('fs');
var url  = require('url');
var userToLookFor = "soumya";
/*
 * GET home page.
 */
exports.view = function(req, res) {
	// console.log(database);
	// First item in the database will be a default one that we will fall back on when users enter a username not found
	
	// TODO: Fix the userToLookFor
	// var userToLookFor = "soumya";
	var userName;
	console.log("Finding user...")
	for ( var idx in database.users) {
		var user = database.users[idx];
		if (user['username'] == userToLookFor) {
			console.log("Found user: " + userToLookFor);
			userName = user;
		}
	}

	// If null, default it 
	if ( userName == null ) {
		console.log("User: " + userToLookFor + " is not found in database, will default now");
		userName = database.users[0];
	}

	console.log("Passing to render: ", userName);
	res.render('index', userName);
};

exports.deleteTask = function(req, res) {
	console.log(req.body);
	let users = JSON.stringify(req.body);
	fs.writeFileSync('./public/database/test.json', users);
	// res.end();
	res.send("saved!");
	// res.render('index', database.users[0]);
    document.location.href = "/";
}

exports.loadUser = function(request, response) {
	console.log("this is the response in index.js" + request.path);
	var pathURL = request.path.split('/');
	userToLookFor = pathURL[2];
	console.log(userToLookFor);

	var userName;
	console.log("Finding user... ");
	// uncomment below line to make code work on localhost
	// console.log(database);
	for ( var idx in database.users) {
		var user = database.users[idx];
		if (user['username'] == userToLookFor) {
			console.log("Found user: " + userToLookFor);
			userName = user;
		}
	}

	// If null, default it 
	if ( userName == null ) {
		console.log("User: " + userToLookFor + " is not found in database, will default now");
		// userName = database.users[0];
	}

	console.log("Passing to render: ", userName);
	response.render('index', userName);
}

exports.saveUser = function(request, response) {
	var pathURL = request.path.split('/');
	userToLookFor = pathURL[2];
	console.log(userToLookFor);
	
	let users = JSON.stringify(request.body);
	fs.writeFileSync('./public/database/test.json', users);

	var userName;
	console.log("Finding user...")
	for ( var idx in database.users) {
		var user = database.users[idx];
		if (user['username'] == userToLookFor) {
			console.log("Found user: " + userToLookFor);
			userName = user;
		}
	}

	response.render('index', userName);
}