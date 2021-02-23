var database = require('../public/database/database.json');

/*
 * GET garden page.
 */
exports.view = function(req, res) {
	var userName = database.users[0];
	console.log("Passing to garden... " + userName.username);
	res.render('garden', userName);
};