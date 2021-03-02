var database = require('../public/database/test.json');

/*
 * GET garden page.
 */
exports.view = function(req, res) {
	var pathURL = req.path.split('/');
	userGarden = pathURL[2];
	console.log(userGarden);

	var userName;
	for (var i = 0; i < database.users.length; i++) {
		var userIdx = database.users[i];
		if (userIdx['username'] == userGarden) {
			userName = userIdx;
			break;
		}
	}

	console.log("Passing to garden... " + userName);
	res.render('garden', userName);
};