var database = require('../public/database/test.json');

/*
 * GET garden page.
 */
exports.view = function(req, res) {
	var userName = database.users[1];
	console.log("Passing to garden... " + userName.username);
	res.render('garden', userName);
};