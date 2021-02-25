var database = require('../public/database/test.json');
var fs = require('fs');

/*
 * GET home page.
 */
exports.view = function(req, res) {
	// console.log(database);
	// First item in the database will be a default one that we will fall back on when users enter a username not found
	
	// TODO: Fix the userToLookFor
	var userToLookFor = "soumya";
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

// exports.userInfo = function(request, response) {
// 	console.log("this is the response in index.js" + request.params.id);
// 	var user = database.json(request.params.id);
// 	console.log(user);
// }

exports.deleteTask = function(req, res) {
	console.log(req.body);
	let users = JSON.stringify(req.body);
	fs.writeFileSync('./public/database/test.json', users);
	// res.end();
	res.send("saved!");
	// res.render('index', database.users[0]);
    // document.location.href = "/";
}