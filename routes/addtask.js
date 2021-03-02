var fs = require('fs');

/*
 * GET add task page.
 */

exports.view = function(req, res){
	res.render('addtask');
};

// exports.addedTask = function(req, res) {
//     console.log("this is the response in index.js" + req.path);
// 	var pathURL = request.path.split('/');
// 	userToLookFor = pathURL[2];
// 	console.log(userToLookFor);

//     console.log(req.body);
//     let users = JSON.stringify(req.body);
//     fs.writeFileSync('./public/database/test.json', users);
    
//     var userName;
// 	console.log("Finding user...")
// 	for ( var idx in database.users) {
// 		var user = database.users[idx];
// 		if (user['username'] == userToLookFor) {
// 			console.log("Found user: " + userToLookFor);
// 			userName = user;
// 		}
// 	}

// 	// If null, default it 
// 	if ( userName == null ) {
// 		console.log("User: " + userToLookFor + " is not found in database, will default now");
// 		// userName = database.users[0];
// 	}

// 	console.log("Passing to render: ", userName);
// 	response.render('index', userName);
// }