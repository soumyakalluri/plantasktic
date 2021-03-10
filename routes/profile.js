var database = require('../public/database/test.json');

/*
 * GET profile page.
 */
exports.view = function(req, res) {
	var pathURL = req.path.split('/');
	userProfile = pathURL[2];
	console.log(userProfile);

	var userName;
	for (var i = 0; i < database.users.length; i++) {
		var userIdx = database.users[i];
		if (userIdx['username'] == userProfile) {
			userName = userIdx;
			break;
		}
	}

	console.log("Passing to profile... " + userName);
	res.render('profile', userName);
};