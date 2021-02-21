var database = require('../public/database/database.json');

/*
 * GET sign up page.
 */

exports.view = function(req, res){
	res.render('signup');
};