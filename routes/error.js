var database = require('../public/database/database.json');

/*
 * GET error page.
 */
exports.view = function(req, res){
	res.render('error');
};